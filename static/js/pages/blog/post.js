$(function () {

    var initialMdSource = "${md.source}",
    originalName = "${md.name}",
    $editor = $(".editor"),
    $editorSides = $(".wrap-markdown-source textarea,.html-preview"),
    $mdSource = $(".markdown-source"),
    $htmlPreview = $(".html-preview"),
    $mainContainer = $(".container-main"),
    isNew = false;


    //tab
    $mdSource.on('keydown', function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 9) {
            e.preventDefault();
            var start = $(this).get(0).selectionStart;
            var end = $(this).get(0).selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            $(this).val($(this).val().substring(0, start)
                + "\t"
                + $(this).val().substring(end));

            // put caret at right position again
            $(this).get(0).selectionStart = $(this).get(0).selectionEnd = start + 1;
        }
    });

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: true,
        sanitize: true,
        smartLists: true,
        smartypants: true
    });

    $editorSides.niceScroll({
        autohidemode: "hidden"
    });
    $editorSides.getNiceScroll().hide();
    $editor.hide();

    function showEditor(mdSource) {

        if (mdSource) {//edit
            $editor.find(".title-nav-editor").val(originalName);
            isNew = false;
        } else {//new
            $editor.find(".title-nav-editor").val("");
            isNew = true;
        }

        $mdSource.val(decodeURIComponent(mdSource));
        $htmlPreview.html("<marked-element>" + mdSource + "</marked-element>");
        hljs.initHighlightingOnLoad();
        $mainContainer.hide();
        $editor.show();
    }

    function closeEditor() {
        $editor.hide();
        $mainContainer.show();
    }

    $(".edit").click(function () {
        showEditor(initialMdSource);
    });
    $(".wrap-markdown-source textarea").on("input", function () {
        var mdSource = encodeURIComponent($(this).val());
        showEditor(mdSource);
    });

    $(".new").click(function () {
        showEditor("");
    });

    $(".reset").click(function () {
        showEditor(initialMdSource);
    });

    $(".save").click(function () {
        var mdSource = $mdSource.val(),
        name = $editor.find(".title-nav-editor").val();
        if (!name) {
            alert("need post title");
            $editor.find(".title-nav-editor").focus();
            return;
        }
        $.ajax({
            url: "/blog/posts",
            type: "POST",
            dataType: "json",
            data: {
                originalName: originalName,
                isNew: isNew,
                name: name,
                md: mdSource
            }
        }).always(function (e) {
            alert(e.data.message)
        })
    });

    $(".close").click(function () {
        closeEditor();
    });


});