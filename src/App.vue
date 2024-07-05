<template>
  <div id="app">
    <router-view />
    <div class="app-float-button">
      <FloatButton
        :isShow="isShowFlotatButton"
        @floatClick="handleFloatClick"
      ></FloatButton>
    </div>
    <div class="app-side-nav">
      <SideNav :isShow="isShowCategoryNav" @collapse="handleCollapse">
        <CategoryList
          :list="categoryListWithActive"
          @changeCategory="handleChangeCategory"
        ></CategoryList>
      </SideNav>
    </div>
  </div>
</template>
<script>
import FloatButton from '@/components/FloatButton/index.vue'
import SideNav from '@/components/SideNav/index.vue'
import CategoryList from '@/components/CategoryList/index.vue'

export default {
  components: {
    FloatButton,
    SideNav,
    CategoryList
  },
  data () {
    return {
      isShowFlotatButton: false, // control FloatButton to show
      isShowCategoryNav: false,
      categoryList: [
        {
          label: '手风琴',
          jumpRouterName: 'accordion',
          children: [
            {
              label: '会话框',
              jumpRouterName: 'dialog'
            },
            {
              label: '无遮罩对话框',
              jumpRouterName: 'nomaskdialog'
            }
          ]
        },
        {
          label: '表格',
          jumpRouterName: 'table',
          children: [
            {
              label: 'popover',
              jumpRouterName: 'popover'
            },
            {
              label: '提示框',
              jumpRouterName: 'tip'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    console.log('this.categoryListWithActive', this.categoryListWithActive)
  },
  computed: {
    activeCategory () {
      console.log('computed-this.$route.name', this.$route.name)
      return this.$route.name
    },
    categoryListWithActive () {
      const setActiveCategory = (list = []) => {
        return list.map(item => {
          return {
            isActive: item.jumpRouterName === this.activeCategory,
            ...item,
            children: setActiveCategory(item.children)
          }
        })
      }
      return setActiveCategory(this.categoryList)
    }
  },
  watch: {
    $route: {
      handler (res) {
        // 路由变化了，先重置isShowFlotatButton为false
        this.isShowFlotatButton = false
        this.isShowCategoryNav = false

        console.log('res', res)
        console.log('res.meta.isShowFlotatButton', res.meta.isShowFlotatButton)
        if (res.meta.isShowFlotatButton) {
          this.isShowFlotatButton = true
        }
        console.log('this.isShowFlotatButton', this.isShowFlotatButton)
      },
      immediate: true,
      deep: true

    }
  },
  methods: {
    handleCollapse () {
      console.log('收到子组件点击collapse了')
      this.isShowCategoryNav = false
      this.isShowFlotatButton = true
    },
    handleChangeCategory (item) {
      console.log('app收到子组件handleChangeCategory', item)
      this.$router.push({ name: item.jumpRouterName })
    },
    handleFloatClick () {
      console.log('弹出目录')
      // 隐藏FloatButton
      this.isShowFlotatButton = false
      this.isShowCategoryNav = true
    }
  }
}
</script>

<style lang="less">
.app-float-button {
  position: fixed;
  left: 5%;
  top: 20%;
  z-index: 99;
}
.app-side-nav {
  position: fixed;
  left: 10%;
  top: 20%;
  z-index: 99;
}
</style>
