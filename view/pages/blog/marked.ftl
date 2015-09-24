<#--
    这里存放页面级的常量配置
    webcomponents 引入 element
-->
<#assign pageConfig = {
"id": "blog-post",
"class":"blog-post",
"webcomponents":[
"marked-element.html"
]
}>
<#include "/common/head.ftl">

<marked-element>
${md}
</marked-element>
<#include "/common/foot.ftl">