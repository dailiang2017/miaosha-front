<template>
  <section>
    <el-row :gutter="15">
      <el-col :span="4" v-for="goods in goodList" :key="goods.id">
        <el-card :body-style="{ padding: '0px' }">
          <img v-bind:src="goods.goodsImg" class="image">
          <div style="padding: 14px;">
            <span>{{goods.goodsName}}</span>
            <div class="bottom clearfix">
              <span style="color: #ff5000;font-size: 22px;">{{goods.seckillGoodsPrice}}</span>
              <span style="font-family: arial;text-decoration: line-through;color: #999;">{{goods.goodsPrice}}</span>
              <div style="margin-top: 10px;">
                <el-progress :percentage="goods.percentage" color="#F28362"></el-progress>
              </div>
            </div>
            <div align="center" style="margin-top: 10px">
              <el-button type="danger" style="width: 100%;" @click="">秒杀</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </section>
</template>
<script>
  export default {
    data() {
      return {
        paiduVisible: false,
        verifyVisible: false,
        processData: 0,
        goodList: [],
        verifyCodeSrc: '',
        verifyForm: {
          verifyCode: null,
          seckillGoodsId: null
        },
        killResult: ''
      };
    },
    methods: {
      queryList() {
        this.$http.get('/goods/queryList').then((response) => {
          let data = response.data;
          if (data.success === true) {
            let list = data.data;
            for (let goods of list) {
              goods.goodsImg = "../../../static/pic/goods/" + goods.goodsImg;
            }
            this.goodList = list
          } else {
            this.$message(data.msg);
          }
        });
      },
    },
    created() {
      this.queryList()
    }
  }
</script>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }s

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .el-col-offset-5 {
    margin-left: 18px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  #verifyForm .el-form-item{
    margin-bottom: 0px;
  }
</style>
