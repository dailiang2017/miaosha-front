<template>
    <el-row class="container" style="height: 100%">
      <v-top :user="user"></v-top>
      <el-col :span="24" class="main" >
        <el-row>

          <el-menu :default-active="$route.path" class="mar-l el-menu-vertical-demo el-col el-col-3" light router>
            <el-menu-item :index="menuList[0].path">
              <i class="el-icon-star-on"></i><span>{{menuList[0].name}}</span>
            </el-menu-item>
            <el-menu-item>
              <i class="el-icon-arrow-down" @click="killShowControl()"></i><span @click="killShowControl()">秒杀</span>
              <el-menu-item-group v-show="killIsShow">
                <el-menu-item  :index="menuList[1].path">{{menuList[1].name}}</el-menu-item>
                <el-menu-item  :index="menuList[2].path">{{menuList[2].name}}</el-menu-item>
              </el-menu-item-group>
            </el-menu-item>
          </el-menu>

          <section class="contentCon">
            <el-col :span="21" :offset="3" class="content-wrapper">
              <transition>
                <router-view></router-view>
              </transition>
            </el-col>
          </section>
        </el-row>
      </el-col>
    </el-row>
</template>

<script>
  import Top from './Top';
  export default {
    data() {
      return {
        user: {},
        menuList: this.$router.options.routes[1].children,
        killIsShow: false
      };
    },
    methods: {
      killShowControl() {
        if (this.killIsShow) {
          this.killIsShow = false;
        } else {
          this.killIsShow = true;
        }
      }
    },
    beforeCreate() {
      if (this.$route.path === '/') {
        this.$router.push({path: '/index'})
      }
    },
    components: {
      'v-top': Top
    }
  };
</script>

<style scoped>
  i.fa {
    vertical-align: baseline;
    margin-right: 10px;
  }

  body {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    background-color: #F2F2F2;
  }

  .menu,
  .el-menu {
    height: 100%;
    background-color: #E6E6E6;
    position: fixed;
    float: left;
  }

  .container {
    padding-top: 30px;
    height: 100%;
  }

  .container .main {
    padding: 0;
  }

  .container ul li.el-menu-item {
    font-size: 100%;
  }

  .container .mar-l {
    padding: 0;
  }

  .container .content-wrapper {
    padding: 20px;
  }
</style>
