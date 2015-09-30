<style>


    .header {
        position: relative;
        background: #1abc9c;
        text-align: center;
    }
    .header h1 {
        display: inline-block;
        padding: 0.1rem 0;
        cursor: pointer;
    }
    .author {
        position: relative;
        color: #fff;
        font-size: 0.4rem;
        -webkit-transition: all .1s ease-out;
        -moz-transition: all .1s ease-out;
        -o-transition: all .1s ease-out;
        -ms-transition: all .1s ease-out;
        transition: all .1s ease-out;
    }


    .motto {
        position: relative;
        margin-left: -0.06rem;
        font-size: 0.18rem;
        letter-spacing: -0.01rem;
        color: #fff;
        z-index: 2;
        -webkit-transition: all .5s ease-out;
        -moz-transition: all .5s ease-out;
        -o-transition: all .5s ease-out;
        -ms-transition: all .5s ease-out;
        transition: all .5s ease-out;
    }

    .header h1:hover .motto {
        left: 0.26rem;
        opacity: .2;
    }

    .header h1:hover .author {
        letter-spacing: 0.05rem;
    }
</style>
<script>
</script>

<div class="header">
    <div class="container-inner">
        <div class="logo">
            <a href="/blog">
                <h1>
                    <span class="author">zodiac</span>
                    <span class="motto">we are yong we are strong</span>
                </h1>
            </a>
        </div>
    </div>
</div>