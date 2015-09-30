<#--
    这里存放页面级的常量配置
    webcomponents 引入 element
-->
<#assign pageConfig = {
"id": "blog-post",
"class":"blog-post",
"bower_components":["jquery/dist/jquery.min.js","jquery.nicescroll/dist/jquery.nicescroll.min.js"],
"cssDeps":["post.css","highlight-default.css"],
"jsDeps":["marked.js","highlight.pack.js"],
"webcomponents":[
"marked-element.html",
"table-contents-element.html"
]
}>
<#include "/common/head.ftl">


<style>
    .editor {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: black;
        z-index: 2;
    }

    .nav-editor {
        height: 0.4rem;
        line-height: 0.4rem;
        background-color: #1abc9c;
        text-align: center;
    }

    .contain-editor {
        position: absolute;
        left: 0;
        right: 0;
        top: 0.4rem;
        bottom: 0.1rem;
        background-color: white;
    }

    .wrap-markdown-source {
        position: absolute;
        height: 100%;
        left: 0;
        right: 50%;
    }

    .html-preview {
        position: absolute;
        height: 100%;
        right: 0;
        left: 50%;
        padding-left: 0.2rem;
        overflow: scroll;
        overflow-x: hidden;
    }

    .wrap-markdown-source textarea {
        display: block;
        width: 100%;
        height: 100%;
        resize: none;
        background-color: #101010;
        color: #8C8C8C;
    }

    }
    .nicescroll-rails {
        display: none !important;
    }

    .title-nav-editor {
        display: inline-block;
        width: 3rem;
        text-align: center;
        border: 0;
        border-radius: 0.05rem;
        padding: 4px;
        margin-right: 0.4rem;
        background-color: white;
    }


</style>

<#include "/common/header.ftl">

<div class="container-main">
    <button class="edit">
        edit
    </button>
    <button class="new">
        new
    </button>
    <header class="post-header">
        <h1 class="post-title">${md.name}</h1>

        <p class="post-meta">${md.lastModifiedTime}</p>
    </header>
    <table-contents-element></table-contents-element>
    <marked-element>${md.source}</marked-element>
</div>

<div class="editor">
    <div class="nav-editor">
        <input class="title-nav-editor">
        <button class="reset">
            reset
        </button>
        <button class="save">
            save
        </button>
        <button class="close">
            close
        </button>
    </div>
    <div class="contain-editor">
        <div class="wrap-markdown-source">
            <textarea class="markdown-source">

            </textarea>
        </div>
        <div class="html-preview">
        </div>
    </div>
</div>

<script>
    $(function () {

        var id,
        initialMdSource = "${md.source}",
        $editor = $(".editor"),
        $editorSides = $(".wrap-markdown-source textarea,.html-preview"),
        $mdSource = $(".markdown-source"),
        $htmlPreview = $(".html-preview"),
        $mainContainer = $(".container-main");


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

        $editorSides.niceScroll();
        $editorSides.getNiceScroll().hide();
        $editor.hide();

        function showEditor(mdSource) {

            if (mdSource) {//edit
                $editor.find(".title-nav-editor").val("${md.name}");
                id = "${md.id}";
            } else {//new
                $editor.find(".title-nav-editor").val("");
                id = 0;
            }

            $mdSource.val(decodeURIComponent(mdSource));
            $htmlPreview.append("<marked-element>" + mdSource + "</marked-element>");
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
            var mdSource = $(this).val();
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
                    id: id,
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
</script>

<#include "/common/foot.ftl">