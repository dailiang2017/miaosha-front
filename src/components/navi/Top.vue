<template>
  <div>
    <header>
      <img src="./logo.svg" alt="logo" class="header-logo">

      <ul class="header-operations">
        <li>
          <span class="header-lang is-active" style="font-family:'PingFang SC';font:25px Extra large">欢迎你,{{user.name}}</span>
        </li>
      </ul>
    </header>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        user: {
          name: ""
        }
      };
    },
    created() {
      this.$http.get('/user/getUser').then((response) => {
        let data = response.data;
        if (data.success === true) {
          this.user.name = data.data.nickname;
        }else {
          this.$message(data.msg);
        }
      });
    }
  };
</script>
<style>
  header {
    background-color:black;
    height: 80px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding: 0 0px;
    z-index: 999;
    box-sizing: border-box;
    position: fixed;
    text-align: left;
  }

  .header-logo {
    display: inline-block;
    vertical-align: middle;
  }

  .header-operations {
    display: inline-block;
    float: right;
    height: 80%;
  }

  .header-operations li {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    line-height: 55px;
    cursor: pointer;
  }

  .header-operations li:first-child {
    cursor: default
  }

  .header-opacity {
    opacity: .7;
  }

  .header-operations:after, header:after {
    display: inline-block;
    content: "";
    height: 100%;
    vertical-align: middle;
  }
</style>
