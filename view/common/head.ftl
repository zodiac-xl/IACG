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

    <#--jquery-->
    <script src="/bower_components/jquery/dist/jquery.js"></script>

    <#--require-->
    <script src="/bower_components/requirejs/require.js"></script>
    <script>
        require.config({
            //By default load any module IDs from js/lib
            baseUrl: '/',
            //except, if the module ID starts with "app",
            //load it from the js/app directory. paths
            //config is relative to the baseUrl, and
            //never includes a ".js" extension since
            //the paths config could be for a directory.
            paths: {
                text: "bower_components/text/text",
                css: "bower_components/require-css/css",
                wc:"bower_components/require-webcomponents/webcomponents",
                jquery:"bower_components/jquery/dist/jquery.min",
                niceScroll:"bower_components/jquery.nicescroll/dist/jquery.nicescroll.min",
                toastr:"bower_components/toastr/toastr.min"
            },
            "shim": {
                "niceScroll"  : ["jquery"]
            }

        });
    </script>


    <#--css依赖 首屏css尽量不要使用require加载（避免闪屏）-->
    <#if pageConfig.cssDeps??>
        <#list pageConfig.cssDeps as cssDep>
            <link  rel="stylesheet" href="/css/${cssDep}.css">
        </#list>
    </#if>
</head>
<body class="${pageConfig.class!}" id="${pageConfig.id!}">