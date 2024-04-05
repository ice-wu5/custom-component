<template>
<div class="home">
  <div class="nav-container w100 h60px bgc999 lh60px m0auto">
    <NavBar :navList="navList"></NavBar>
  </div>
</div>
</template>

<script>
import NavBar from '@/views/Nav/Nav.vue'

export default {
  name: 'HomeIndex',
  components: {
    NavBar
  },
  data () {
    return {
      navList: [
        {
          id: 1,
          title: 'tip',
          name: '提示框'
        },
        {
          id: 2,
          name: '手风琴'
        },
        {
          id: 3,
          name: '会话框'
        },
        {
          id: 4,
          name: '抽屉'
        },
        {
          id: 5,
          name: '提示表单框'
        }

      ]
    }
  }
}
</script>

<style lang="less" scoped>

</style>>
