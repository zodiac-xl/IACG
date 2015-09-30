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
    <meta name="viewport" content="initial-scale=1, width=device-width, maximum-scale=1, user-scalable=no">

    <link rel="icon" type="image/x-icon" href="/img/favicon.ico"/>
    <link rel="stylesheet" href="/css/reset.css"/>
    <link rel="stylesheet" href="/css/main.css"/>

<#-- 给 Web Components 使用 Polyfills 以便支持旧的浏览器 -->
    <script src="/bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>

<#--bower_components依赖-->
<#if pageConfig.bower_components??>
    <#list pageConfig.bower_components as bower_component>
        <script src="/bower_components/${bower_component}"></script>
    </#list>
</#if>

<#--css依赖-->
<#if pageConfig.cssDeps??>
    <#list pageConfig.cssDeps as cssDep>
        <link rel="stylesheet" href="/css/${cssDep}">
    </#list>
</#if>

<#--js依赖-->
<#if pageConfig.jsDeps??>
    <#list pageConfig.jsDeps as jsDep>
        <script src="/js/${jsDep}"></script>
    </#list>
</#if>

<#--Web Components依赖-->
<#if pageConfig.webcomponents??>
    <#list pageConfig.webcomponents as webcomponent>
        <link rel="import" href="/webcomponents/${webcomponent}">
    </#list>
</#if>
</head>
<body class="${pageConfig.class!}" id="${pageConfig.id!}">
