<template>
  <section>
    <el-row :gutter="15">
      <el-col :span="4" v-for="goods in goodList">
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
              <el-button type="danger" style="width: 100%;" @click="createVerifyCode(goods.id)">秒杀</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="请证明你不是机器人" :visible.sync="verifyVisible"  id="verifyForm">

      <el-form :inline="true"  class="demo-form-inline" :model="verifyForm">
        <el-form-item label="">
          <img v-bind:src="verifyCodeSrc" style="width: 200px;height: 50px">
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="verifyForm.verifyCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="verifySubmit()">确定</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
    <el-dialog title="正在排队中" :visible.sync="paiduVisible">
      <div role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"
           class="el-progress el-progress--line el-progress--text-inside">
        <div class="el-progress-bar">
          <div class="el-progress-bar__outer" style="height: 18px;">
            <div class="el-progress-bar__inner" :style="{width: processData+'%'}">
              <div class="el-progress-bar__innerText">{{processData}}%</div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
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
      createVerifyCode(seckillGoodsId) {
        this.$http.get('/api/user/getUser').then((response) => {
          let data = response.data;
          if (data.code === 0) {
            this.verifyCodeSrc = "/api/kill/verifyCode?seckillGoodsId=" + seckillGoodsId + "&currentTime=" + Date.now()
            this.verifyVisible = true
            this.verifyForm.seckillGoodsId = seckillGoodsId
          }else {
            this.$message(data.msg);
          }
        });
      },
      verifySubmit() {
        let path = '/api/kill/path?seckillGoodsId=' + this.verifyForm.seckillGoodsId + "&verifyCode=" + this.verifyForm.verifyCode
        this.$http.get(path).then((response) => {
          let data = response.data;
          if (data.code === 0) {
            let miaoshaPath = data.data;
            this.verifyVisible = false
            this.openPaiDui(miaoshaPath)
          } else {
            this.$message(data.msg);
            this.createVerifyCode(this.verifyForm.seckillGoodsId)
          }
        });
        this.verifyForm.verifyCode = ''
      },
      kill(miaoshaPath) {
        let path = '/api/kill/' + miaoshaPath + '/miaosha?seckillGoodsId=' + this.verifyForm.seckillGoodsId
        this.$http.get(path).then((response) => {
          let data = response.data;
          if (data.code === 0) {
            //入队列了
          } else {
            this.killResult = data.msg;
          }
        });
      },

      queryResult() {
        //已经秒杀过了
        if (this.killResult) {
          this.$message(this.killResult);
        } else {
          let path = '/api/order/queryResult?seckillGoodsId=' + this.verifyForm.seckillGoodsId
          this.$http.get(path).then((response) => {
            let data = response.data;
            if (data.code === 0) {
              let orderId = data.data
              // alert(orderId)
              this.$router.push({path: '/orderList', query: {'id': orderId}});
            } else {
              this.$message(data.msg);
            }
          });
        }
        this.killResult = ''
        this.paiduVisible = false
      },
      getData() {
        this.$http.post('/api/goods/queryList').then((response) => {
          let data = response.data;
          if (data.code === 0) {
            let list = data.data;
            for (let goods of list) {
              goods.goodsImg = "../../../static/pic/" + goods.goodsImg;
            }
            this.goodList = list
          } else {
            this.$message(data.msg);
          }
        });
      },
      openPaiDui(miaoshaPath) {
        //请求秒杀
        this.kill(miaoshaPath);

        this.processData = 0
        this.paiduVisible = true
        let self = this;
        let interval = setInterval(getTotelNumber, 1000)
        function getTotelNumber() {
          self.processData += 20
          if (self.processData === 100) {
            clearInterval(interval);
            //查询结果
            self.queryResult(miaoshaPath)
          }
        }
      }
    },
    created() {
      this.getData();
    }
  }
</script>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }

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
