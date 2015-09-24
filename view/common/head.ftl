<#include "/common/setting.ftl">

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>IACG</title>
    <meta name="description" content="IACG">
    <meta name="keywords" content="acg">
    <meta name="format-detection" content="telephone=no"><#-- 禁止浏览器自动将手机号码变为拨号链接 -->
    <meta name="format-detection" content="address=no"><#-- 禁止浏览器自动将地址转换 -->
    <meta http-equiv="X-UA-Compatible"
          content="IE=edge"><#--missing X-UA-Compatible tag wil disables old IE compatibility modes-->
    <meta name="viewport"
          content="width=device-width, initial-scale=1"><#--missing viewport  tag will enables responsiveness-->

    <link rel="icon" type="image/x-icon" href="/static/img/favicon.ico"/>
    <link rel="stylesheet" href="/static/css/reset.css"/>

<#-- 给 Web Components 使用 Polyfills 以便支持旧的浏览器 -->
    <script src="/static/bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>

<#--markdown js-->
    <script src="/static/js/markdown.js"></script>


<#--Web Components依赖-->
<#if pageConfig.webcomponents??>
    <#list pageConfig.webcomponents as webcomponent>
        <link rel="import" href="/view/webcomponents/${webcomponent}">
    </#list>
</#if>
</head>
<body class="${pageConfig.class!}" id="${pageConfig.id!}">
