<#--
    这里存放页面级的常量配置
    webcomponents 引入 element
-->
<#assign pageConfig = {
"id": "blog-home",
"class":"blog-home",
"cssDeps":["post.css"],
"webcomponents":[
"marked-element.html"
]
}>
<#include "/common/head.ftl">
<link href="/static/css/post.css">
<#include "/common/header.ftl">
<div class="container-main">

    <h1 class="page-heading">Posts</h1>
    <span>共${totalSize}篇博文</span>
    <ul class="post-list">
    <#list posts as post>
        <li>
            <span class="post-meta">${.now?date}</span>

            <h2>
                <a class="post-link" href="/blog/posts/${post.name}">${post.name}</a>
            </h2>
        </li>
    </#list>
    <#if preIndex?string!="false">
        <a href="/blog?page=${preIndex}">上一页</a>
    </#if>
    <#if nextIndex?string !="false" >
        <a href="/blog?page=${nextIndex}">下一页</a>
    </#if>
    </ul>
</div>
<#include "/common/foot.ftl">