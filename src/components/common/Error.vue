<template>
    <div>{{msg}}</div>
</template>

<script>
    export default {
      data() {
        return {
          msg: sessionStorage.getItem(this.$global.error_key)
        };
      },
    }
</script>

<style scoped>

</style>
