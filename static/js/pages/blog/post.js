define([
    "jquery",
    "niceScroll",
    "css!toastr",
    "toastr"
], function ($,niceScroll,cssStr,toastr) {

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    return {
        init: function (initialMdSource, originalName, tagsString) {
            var $editor = $(".editor"),
            $editorSides = $(".wrap-markdown-source textarea,.html-preview"),
            $mdSource = $(".markdown-source"),
            $htmlPreview = $(".html-preview"),
            $mainContainer = $(".container-main"),
            $tagsEditorWrap = $(".wrap-editor-tags"),
            originalSource,
            isNew = false,
            tags = tagsString.split(";");


            $editor.hide();


            var page = {

                showEditor: function (mdSource) {

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
                    $editorSides.niceScroll();
                    $editorSides.eq(0).getNiceScroll().hide();
                },

                closeEditor: function () {
                    $editor.hide();
                    $mainContainer.show();
                    $editorSides.getNiceScroll().remove();
                },
                resetEditor: function () {
                    page.showEditor(originalSource);
                },
                saveEditor: function () {
                    var mdSource = $mdSource.val(),
                    name = $editor.find(".title-nav-editor").val();
                    if (!name) {
                        toastr["info"]("need post title");
                        $editor.find(".title-nav-editor").focus();
                        return;
                    }
                    $.ajax({
                        url: "/blog/posts",
                        type: "POST",
                        dataType: "json",
                        data: {
                            originalName: originalName,
                            type: isNew ? 0 : 1,
                            name: name,
                            md: mdSource
                        }
                    }).done(function (e) {
                        setTimeout(function () {
                            location.replace("/blog/posts/" + encodeURIComponent(name));
                        }, 1000);
                    })
                },


                editMd: function () {
                    originalSource = initialMdSource;
                    page.showEditor(initialMdSource);
                },
                newMd: function () {
                    originalSource = "";
                    page.showEditor("");
                },
                deleteMd: function () {
                    if(confirm("确定删除"+originalName+".md?")){
                        $.ajax({
                            url: "/blog/posts",
                            type: "DELETE",
                            dataType: "json",
                            data: {
                                name: originalName
                            }
                        }).done(function (e) {
                            location.replace("/blog");
                        })
                    }
                },
                toggleTagsEditor: function () {
                    $tagsEditorWrap.find(".tags").val(tags.join(";"));
                    $tagsEditorWrap.toggle();
                },
                chooseTag: function (el) {
                    var tag = $(el).val(),
                    val = $tagsEditorWrap.find(".tags").val();
                    if (!tag) {
                        return;
                    }
                    val = val ? val.split(';') : [];
                    for (var i = 0; i < val.length; i++) {
                        if (val[i] == tag) {
                            return false;
                        }
                    }
                    val.push(tag);
                    $tagsEditorWrap.find(".tags").val(val.join(";"));
                },

                saveTags: function () {
                    var tags = $tagsEditorWrap.find(".tags").val();
                    tags = tags ? tags.split(";") : [];
                    $.ajax({
                        url: "/blog/posts/" + originalName + "/tags/edit",
                        type: "POST",
                        dataType: "json",
                        data: {
                            tags: JSON.stringify(tags)
                        }
                    }).done(function (e) {
                        toastr["info"](e.data.message);
                    })
                }
            };

            function bindEvent($el, eventType) {
                $el.on(eventType, function () {
                    var fn = $(this).attr("bind-" + eventType);
                    page[fn] && page[fn](this);
                })
            }

            bindEvent($("[bind-click]"), "click");
            bindEvent($("[bind-change]"), "change");


            $(".wrap-markdown-source textarea").on("input", function () {
                var mdSource = encodeURIComponent($(this).val());
                page.showEditor(mdSource);
            });

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


        }
    }
});
