<template>
  <section>
    <el-carousel :interval="4000" type="card" height="500px">
      <el-carousel-item>
        <img src="../../../static/pic/index/求职攻略.jpg" class="image" style="width: 100%;">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../../static/pic/index/求职礼仪.jpg" class="image" style="width: 100%;">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../../static/pic/index/好工作轻松找.jpg" class="image" style="width: 100%;">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../../static/pic/index/成功.jpg" class="image" style="width: 100%;">
      </el-carousel-item>
    </el-carousel>
  </section>
</template>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
