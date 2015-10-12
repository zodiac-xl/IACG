<#--
    这里存放页面级的常量配置
    webcomponents 引入 element
-->
<#assign pageConfig = {
"id": "blog-home",
"class":"blog-home",
"cssDeps":["pages/blog/blog"]
}>

<#include "/common/head.ftl">


<#include "/common/header.ftl">
<div class="container-main">

    <h1 class="page-heading">${title}</h1>
    <span>共${totalSize}篇博文</span>
    <ul class="post-list">
    <#list posts as post>
        <li>
            <span class="post-meta">${post.lastModifiedTime}</span>

            <h2>
                <a class="post-link" href="/blog/posts/${post.name}">${post.name}</a>
            </h2>
        </li>
    </#list>
    <#if prePage != "">
        <a href="${prePage}">上一页</a>
    </#if>
    <#if nextPage != "">
        <a href="${nextPage}">下一页</a>
    </#if>
    </ul>
    <div>
    <#list tags as tag>
        <a href="/blog?tagName=${tag}">${tag}</a>
    </#list>
    </div>
</div>

<#include "/common/foot.ftl">