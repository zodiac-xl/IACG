<#--
    这里存放页面级的常量配置
    webcomponents 引入 element
-->
<#assign pageConfig = {
"id": "blog-post",
"class":"blog-post",


"jsDeps":["marked.js","highlight.pack.js","pages/blog/post.js"],

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
        display: none;

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
    $(function(){
        require(["css!pages/blog/blog","css!pages/blog/highlight-default","wc!marked-element.html"],function(str1,str2){

        })
    })
</script>

<#include "/common/foot.ftl">