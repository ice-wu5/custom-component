<template>
  <div class="container">
    <div class="card w200px h60px ">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardItem'
}
</script>

<style lang="less" scoped>
.card {
  width: 200px;
  height: 300px;
}
</style>>
