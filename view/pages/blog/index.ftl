<#--
    这里存放页面级的常量配置
    webcomponents 引入 element
-->
<#assign pageConfig = {
"id": "blog-home",
"class":"blog-home",
"webcomponents":[
"marked-element.html"
]
}>
<#include "/common/head.ftl">
<ul>
<#list categorys as category>
    <li><a href="/blog/posts/${category.name}">${category.name}</a></li>
</#list>
</ul>
<#include "/common/foot.ftl">