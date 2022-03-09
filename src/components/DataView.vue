<template>
    <div id="right_nav">
        <div class="right_nav_title">
            <span class="right_nav_title_span">概览</span>
        </div>
        <div class="right_nav_total"></div>
        <div class="right_nav_title">
            <span class="right_nav_title_span">今日打卡</span>
        </div> 
        <div class="right_nav_today"></div>
    </div>
</template>

<script>


    export default {
        
    }

</script>


<style scoped>
    /* right nav */

    #right_nav {
        position: absolute;
        left: 1115px;
        top: 135px;
        width: 350px;
        height: 665px;
    }

    .right_nav_title {
        width: 350px;
        height: 35px;
    }

    span.right_nav_title_span {
        font-size: 2em;
    }

    .right_nav_total {
        margin-top: 20px;
        margin-bottom: 20px;
        width: 100%;
        height: 300px;
        border-radius: 20px;
        background-color: rgb(246, 246, 248);
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .right_nav_today {
        margin-top: 20px;
        width: 100%;
        height: 300px;
        border-radius: 20px;
        background-color: rgb(246, 246, 248);
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
</style>