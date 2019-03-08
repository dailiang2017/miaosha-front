<template>
  <!--背景图-->
  <div class="note" :style="note">

    <!--login框，表单+tab标签页的组合-->
    <div class="loginFrame">

      <!--表单组件放在外面，标签栏在里面-->
      <el-form class="demo-ruleForm login-container" label-position="left">

        <!--tab标签-->
        <div class="tabsUser">

        </div>
          <el-form-item label="账 号" prop="user">
            <el-input type="text" v-model="account.username" placeholder="请输入您的账号" class="form-control" ></el-input>
          </el-form-item>
          <el-form-item label="密 码" prop="password" class="form-inline">
            <el-input type="password" v-model="account.password" placeholder="请输入密码" class="form-control"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="info" style="width:100%;margin-top:10px;font-size: large;" @click="login()">登&nbsp;录</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        note: {
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
          backgroundImage: "url(" + require("../../../static/pic/login2.jpg") + ")",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat"
        },
        account: {
          username: '代亮',
          password: '123456',
        }
      };
    },
    methods: {
      login () {
        let param = {
          username: this.account.username,
          password: this.$global.recombine(this.account.password)
        }
        this.$http.post('/user/login', param).then((response) => {
          let data = response.data;
          if (data.success === true) {
            this.$router.push({path: '/index'});
          }else{
            this.$message(data.msg);
          }
        });
      }
    }
  }
</script>

<style>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 15px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  label {
    width: 70px;
    text-align: left;
  }
  .form-control {
    width: 270px;
    flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
  }
  .remember {
    width: 250px;
    text-align: left;
  }
  .forget {
    width: 500px;
    text-align: right;
    font-size: 14px;
    font-family: PingFang SC;

  }
  .remFor {
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
  .tabsUser {
    display: inline-block;
    margin-left: 0px;
    margin-right: 0px;
    text-align: center;
    font-size: 25px;
  }
  .el-form--label-left .el-form-item__label{
    font-size: large;
    font-weight: unset;
  }
</style>
