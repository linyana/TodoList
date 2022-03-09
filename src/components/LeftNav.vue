<template>
  <div id="left_nav">
      <div class="left_nav_user">
          <img id="left_nav_user_img" src="@/assets/headPortrait.png" alt="">
          <span id="user_name_span">Aurora</span>
          <div class="left_nav_list">
              <ul>
                    <li><img src="@/assets/myBacklog.png" alt="">
                        <span>
                            <router-link to='/MyBacklog'>我的待办</router-link>
                        </span>
                    </li>
                    <li><img src="@/assets/dataStatistics.png" alt="">
                        <span>
                            <router-link to='/DataStatistics'>数据统计</router-link>
                        </span>
                    </li>
                    <li><img src="@/assets/setting.png" alt="">
                        <span>
                            <router-link to='/Setting'>设置</router-link>
                        </span>
                    </li>
                    <li><img src="@/assets/about.png" alt="">
                        <span>
                            <router-link to='/About'>关于</router-link>
                        </span>
                    </li>
              </ul>
          </div>
      </div>
      
  </div>
</template>

<script>
    export default {
        methods:{
            hello(){
                this.$router.push('/MyBacklog')
                this.$router.forward()
            }
        },
        mounted() {
            this.hello()
        }
    }
</script>

<style scoped>

    #left_nav {
        position: fixed;
        left: 0;
        top: 0;
        width: 200px;
        height: 100%;
        background-color: rgb(246, 246, 248);
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    /* left nav user */

    .left_nav_user img#left_nav_user_img {
        position: absolute;
        left: 23px;
        top: 50px;
        width: 46px;
        height: 46px;
        border-radius: 23px;
        border: 1px solid #515151;
    }

    .left_nav_user span#user_name_span {
        position: absolute;
        left: 92px;
        top: 58px;
        font-size: 1.6em;
        color: #515151;
    }

    /* left nav list */

    .left_nav_list {
        position: absolute;
        top: 140px;
        left: 30px;
        width: 140px;
        height: 200px;
    }

    .left_nav_list ul li {
        position: relative;
        margin-bottom: 20px;
        list-style: none;
        height: 30px;
    }

    .left_nav_list ul li img{
        width: 28px;
        height: 28px;
    }

    .left_nav_list ul li span {
        position: absolute;
        top: 5px;
        left: 50px;
        font-size: 1em;
    }
    
</style>