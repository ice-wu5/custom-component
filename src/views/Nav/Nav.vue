<template>
  <div class="container w100 h100">
    <div class="nav w100 m0auto h100 tac">
      <ul class="flex h100 w100 lh60px ">
        <li v-for="(item,index) in navList" :key="index" @click="toggle(item.title)" class="w200px h100 tac hover-bgc-pink c-pointer border-1-eee flex-1">{{item.name}}</li>
      </ul>
    </div>
  </div>
  </template>

<script>
export default {
  name: 'NavIndex',
  props: {
    navList: {
      type: Array,
      require: true
    }
  },
  methods: {
    goTabByTitle (title) {
      const path = `/${title}`
      this.$router.push(path)
    },
    toggle (title) {
      console.log(title)
    }
  }
}
</script>

<style lang="less" scoped>

</style>>
