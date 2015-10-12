<#--
    这里存放页面级的常量配置
    webcomponents 引入 element
-->
<#assign pageConfig = {
"id": "blog-post",
"class":"blog-post",
"cssDeps":["pages/blog/blog","pages/blog/highlight-default"]
}>
<#include "/common/head.ftl">

<#include "/common/header.ftl">

<style>
    .editor {
        display: none;
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
    }

    .wrap-markdown-source textarea {
        display: block;
        width: 100%;
        height: 100%;
        resize: none;
        background-color: #101010;
        color: #8C8C8C;
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

    marked-element {
        display: block;
        min-height: 5rem;
        visibility: hidden;
    }

</style>

<#assign tagsString = "">

<div class="container-main">
    <div class="wrap-btns-edit">
        <button bind-click="editMd">
            edit
        </button>
        <button bind-click="newMd">
            new
        </button>
        <button bind-click="deleteMd">
            delete
        </button>
        <button bind-click="toggleTagsEditor">
            edit tags
        </button>
        <div class="wrap-editor-tags" style="display: none">
            <input class="tags">
        <#if tags?size?string != "0">
            <select bind-change="chooseTag">
                <option></option>
                <#list tags as tag>

                    <option>${tag}</option>
                </#list>
            </select>

        </#if>
            <button bind-click="saveTags">save tags</button>
        </div>
    </div>
    <header class="post-header">
        <h1 class="post-title">${md.name}</h1>

        <p class="post-meta">${md.lastModifiedTime}</p>
    <#if md.tags?size?string != "0">
        <#list md.tags as tag>
            <a href="/blog?tagName=${tag}">${tag}</a>
            <#if tag_index == 0>
                <#assign tagsString = tagsString + tag>
            <#else>
                <#assign tagsString = tagsString +";"+ tag>
            </#if>
        </#list>
    </#if>
    </header>
    <table-contents-element></table-contents-element>
    <marked-element>${md.source}</marked-element>

    <div>
    <#if md.preNode??&&md.preNode.name??>
        <<<a href="/blog/posts/${md.preNode.name}">${md.preNode.name}</a>
    </#if>
        &nbsp;&nbsp;&nbsp;&nbsp;
    <#if md.nextNode??&&md.nextNode.name??>
        <a href="/blog/posts/${md.nextNode.name}">${md.nextNode.name}</a>>>
    </#if>
    </div>
</div>

<div class="editor">
    <div class="nav-editor">
        <input class="title-nav-editor">
        <button class="reset" bind-click="resetEditor">
            reset
        </button>
        <button class="save" bind-click="saveEditor">
            save
        </button>
        <button class="close" bind-click="closeEditor">
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
    var initialMdSource = "${md.source}",
    originalName = "${md.name}",
    tagsString = "${tagsString}";
    require([
                "wc!webcomponents/marked-element/marked-element", "wc!webcomponents/table-contents-element",
                "js/pages/blog/post"
            ],
            function (ele1, ele2, page) {
                page.init(initialMdSource, originalName, tagsString);
            })
</script>

<#include "/common/foot.ftl">