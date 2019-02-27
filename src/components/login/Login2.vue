<template>
    <div class="note" :style="note">
      <el-form>
        <el-form-item></el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
      name: "Login",
      data() {
          return {
            note: {
              backgroundImage:"url(" + require("../../../static/pic/login.jpg") + ")"
            }
          }
      }
    }
</script>

<style scoped>

</style>
