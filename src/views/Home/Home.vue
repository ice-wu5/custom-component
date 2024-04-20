<template>
<div class="home">
  <div class="nav-container w100 h60px  lh60px m0auto">
    <NavBar :navList="navList"></NavBar>
  </div>
  <router-view></router-view>
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
          title: 'accordion',
          name: '手风琴'
        },
        {
          id: 3,
          title: 'dialog',
          name: '会话框'
        },
        {
          id: 4,
          title: 'nomaskdialog',
          name: '无遮罩弹窗'
        },
        {
          id: 5,
          title: 'table',
          name: '表格'
        }

      ]
    }
  },
  mounted () {
    this.getDate()
  },
  methods: {
    async getDate () {
      const res = await fetch('https://study.duyiedu.com/api/herolist')
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>

</style>>
