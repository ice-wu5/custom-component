<template>
  <div id="app" draggable="true" @dragover="onDragOver" @drop="onDrop">
    <router-view />
    <div
      class="app-float-button"
      draggable="true"
      ref="floatButton"
      @mousedown="onMouseDown"
      @touchstart="onTouchStart"
      @dragstart="onDragStart"
      :style="{
        top: top + 'px',
        left: left + 'px',
      }"
    >
      <FloatButton
        :isShow="isShowFlotatButton"
        @floatClick="handleFloatClick"
      ></FloatButton>
    </div>
    <div
      class="app-side-nav"
      ref="sideNav"
      :style="{ left: sideNavLeft + 'px', top: sideNavTop + 'px' }"
    >
      <SideNav
        :isShow="isShowCategoryNav"
        :labelRect="labelRect"
        @collapse="handleCollapse"
        @getWidth="setSideNavWidth"
        @transitionEnd="handleTransitionEnd"
      >
        <CategoryList
          ref="categoryList"
          :list="categoryListWithActive"
          @scrollToActive="handleScrollToActive"
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
      top: 500, // 悬浮按钮的top
      left: 80, // 悬浮按钮的left
      sideNavTop: 50, // category position top
      sideNavLeft: 50, // category position left
      sideNavWidth: 0, // SideNav width
      sideNavHeight: 0, // SideNav height
      viewportWidth: 0, // 视口宽
      viewportHeight: 0, // 视口高
      rangeHeight: 30, // 高度范围
      rangeWidth: 60, // 宽度范围
      offsetLeft: 60, // 水平方向偏移量
      scrollTop: 0, // 滚动高度
      labelRectHeight: 0, // activeLabel的高度
      labelRectTop: 0, // activeLabel的top
      labelRect: {},
      dragging: false, // 是否正在拖动中
      startX: 0,
      startY: 0,
      isShowFlotatButton: false, // control FloatButton to show
      isShowCategoryNav: false, // 是否展示目录导航列表
      // 目录列表
      categoryList: [
        {
          label: '手风琴',
          jumpRouterName: 'xxxx',
          level: 1,
          children: [
            {
              label: '会话框',
              jumpRouterName: 'xxxxx',
              level: 2

            },
            {
              label: '无遮罩对话框',
              jumpRouterName: 'xxxxx',
              level: 2

            }
          ]
        },
        {
          label: '表格',
          jumpRouterName: 'xxx',
          level: 1,

          children: [
            {
              label: 'popover',
              jumpRouterName: 'xxx',
              level: 2

            },
            {
              label: '提示框',
              jumpRouterName: 'xxx',
              level: 2,

              children: [
                {
                  label: '会话框',
                  jumpRouterName: 'xxx',
                  level: 3

                },
                {
                  label: '表格',
                  jumpRouterName: 'table',
                  level: 3

                }
              ]
            },
            {
              label: '提示框',
              jumpRouterName: 'tip',
              level: 2,

              children: [
                {
                  label: '会话框',
                  jumpRouterName: 'dialog',
                  level: 3

                },
                {
                  label: '无遮罩对话框',
                  jumpRouterName: 'nomaskdialog',
                  level: 3

                }
              ]
            }
          ]
        }
      ]
    }
  },
  mounted () {
    console.log('getExpandObject', this.getExpandObject())

    console.log('this.categoryListWithActive', this.categoryListWithActive)
  },
  computed: {
    // 边界SideNav top值
    limitSideNavTop () {
      return this.viewportHeight - this.sideNavHeight - this.rangeHeight
    },
    // 边界SideNav left值
    limitSideNavLeft () {
      return this.viewportWidth - this.sideNavWidth
    },

    // 悬浮按钮的top是否超边界
    isTopOverLimit () {
      return this.top >= this.limitSideNavTop
    },

    // 悬浮按钮的left是否超边界
    isLeftOverLimit () {
      return this.left >= this.limitSideNavLeft
    },

    // 当前激活的目录
    activeCategory () {
      console.log('computed-this.$route.name', this.$route.name)
      return this.$route.name
    },

    // categoryList映射成带有isActive属性的新数组
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
    // 路由对象
    $route: {
      handler (res) {
        // 路由变化了，先重置为false
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
    // 传递labelRect
    handleScrollToActive (labelRect) {
      console.log('labelRect', labelRect)
      this.labelRect = labelRect
    },
    // setActiveLabel () {

    // },
    getExpandObject () {
      return {
        isActive: true,
        ...{
          item: false
        },
        item: true
      }
    },
    onMouseDown (event) {
      this.startDrag(event.clientX, event.clientY)
      window.addEventListener('mousemove', this.onMouseMove)
      window.addEventListener('mouseup', this.onMouseUp)
    },
    onTouchStart (event) {
      // event.preventDefault() // 禁用默认的触摸行为
      const touch = event.touches[0]
      this.startDrag(touch.clientX, touch.clientY)
      window.addEventListener('touchmove', this.onTouchMove)
      window.addEventListener('touchend', this.onTouchEnd)
    },
    startDrag (clientX, clientY) {
      this.dragging = true
      this.startX = clientX - this.left
      this.startY = clientY - this.top
    },
    onMouseMove (event) {
      if (this.dragging) {
        this.updatePosition(event.clientX, event.clientY)
      }
    },
    onTouchMove (event) {
      const touch = event.touches[0]
      if (this.dragging) {
        this.updatePosition(touch.clientX, touch.clientY)
      }
    },
    onMouseUp () {
      this.endDrag()
    },
    onTouchEnd () {
      this.endDrag()
    },
    updatePosition (clientX, clientY) {
      // 计算新的位置
      let newLeft = clientX - this.startX
      let newTop = clientY - this.startY

      // 获取按钮和视口的尺寸
      const buttonWidth = this.$refs.floatButton.offsetWidth
      const buttonHeight = this.$refs.floatButton.offsetHeight
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // 限制新位置在视口边界内
      newLeft = Math.max(0, Math.min(newLeft, viewportWidth - buttonWidth))
      newTop = Math.max(0, Math.min(newTop, viewportHeight - buttonHeight))

      // 更新位置
      this.left = newLeft
      this.top = newTop
    },
    endDrag () {
      this.dragging = false
      window.removeEventListener('mousemove', this.onMouseMove)
      window.removeEventListener('mouseup', this.onMouseUp)
      window.removeEventListener('touchmove', this.onTouchMove)
      window.removeEventListener('touchend', this.onTouchEnd)
    },

    onDragEnter (e) {
      // console.log('onDragEnter', e)
    },
    // 设置视口宽高
    setViewportSize () {
      this.viewportWidth = window.innerWidth
      this.viewportHeight = window.innerHeight
    },
    onDrop (e) {
      let newLeft = e.clientX - this.startX
      let newTop = e.clientY - this.startY
      // 获取按钮和视口的尺寸
      const buttonWidth = this.$refs.floatButton.offsetWidth
      const buttonHeight = this.$refs.floatButton.offsetHeight
      this.setViewportSize()

      // 限制新位置在视口边界内
      newLeft = Math.max(0, Math.min(newLeft, this.viewportWidth - buttonWidth))
      newTop = Math.max(0, Math.min(newTop, this.viewportHeight - buttonHeight))

      // 更新位置
      this.left = newLeft
      this.top = newTop
      // 更新SideNav的位置
    },
    onDragOver (e) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
      console.log('app-onDragOver', e)
    },
    onDragStart (e) {
      // console.log('onDragStart', event.target)
      // this.dragging = true
      // this.startX = event.clientX - this.left
      // this.startY = event.clientY - this.top
      e.dataTransfer.setData('text/plain', '')
      // e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
    },
    onDrag (event) {
      // if (this.dragging) {
      //   this.left = event.clientX - this.startX
      //   this.top = event.clientY - this.startY
      // }
    },
    onDragEnd (event) {
      // this.dragging = false
      // // 确保在拖拽结束时更新位置
      // if (event.clientX !== 0 && event.clientY !== 0) { // 检查事件坐标，以避免某些情况下的意外行为
      //   this.left = event.clientX - this.startX
      //   this.top = event.clientY - this.startY
      // }
    },

    // category点击关闭按钮的回调
    handleCollapse () {
      console.log('收到子组件点击collapse了')
      this.isShowCategoryNav = false
      this.isShowFlotatButton = true
    },

    // category点击目录的回调
    handleChangeCategory (item) {
      console.log('app收到子组件handleChangeCategory', item)
      this.$router.push({ name: item.jumpRouterName })
    },

    // 设置SideNav的高
    setSideNavHeight () {
      this.sideNavHeight = this.$refs.sideNav.offsetHeight
    },

    // 设置SideNav的宽
    setSideNavWidth (width) {
      console.log('app-getWidth', width)
      this.sideNavWidth = width
    },

    // SideNav过渡结束的回调
    handleTransitionEnd () {
      this.setSideNavPosition()
      // this.$nextTick(() => {
      //   this.$refs.categoryList.scrollToActiveLabel()
      // })
      // requestAnimationFrame(() => {
      //   this.$refs.categoryList.scrollToActiveLabel()
      // })
    },

    // 设置SideNav的left,top
    setSideNavPosition () {
      this.setSideNavHeight()
      this.setViewportSize()

      console.log('sideNavWidth', this.sideNavWidth)
      console.log('sideNavHeight', this.sideNavHeight)
      console.log('before-this.left', this.left)
      console.log('before-this.top', this.top)
      console.log('des-left', this.viewportWidth - this.sideNavWidth)
      console.log('des-top', this.viewportHeight - this.sideNavHeight)
      // 目录列表的超边界偏移距离
      // const rangeHeight = 30
      // if (this.isTopOverLimit) {
      //   // top超边界了
      //   console.log('top超边界了')
      //   this.sideNavTop = this.viewportHeight - this.sideNavHeight - this.rangeHeight

      //   if (this.isLeftOverLimit) {
      //     // left超边界了
      //     console.log('left超边界了')

      //     this.sideNavLeft = this.viewportWidth - this.sideNavWidth
      //   } else {
      //     // left没有超边界
      //     console.log('left没有超边界')

      //     this.sideNavLeft = this.left + rangeHeight * 2
      //   }
      // } else {
      //   // top没有超边界
      //   console.log('top没有超边界')

      //   this.sideNavTop = this.top + rangeHeight
      //   if (this.sideNavTop >) {

      //   }

      //   if (this.isLeftOverLimit) {
      //     // left超边界了
      //     console.log('left超边界了')

      //     this.sideNavLeft = this.viewportWidth - this.sideNavWidth
      //   } else {
      //     // left没有超边界
      //     console.log('left没有超边界')

      //     this.sideNavLeft = this.left + this.rangeWidth
      //   }
      // }
      // 设置left,top
      const sideNavLeft = this.left + this.rangeWidth
      const sideNavTop = this.top + this.rangeHeight
      // 临界值处理
      if (sideNavLeft >= this.limitSideNavLeft) {
        this.sideNavLeft = this.limitSideNavLeft
      } else {
        this.sideNavLeft = sideNavLeft
      }

      if (sideNavTop >= this.limitSideNavTop) {
        this.sideNavTop = this.limitSideNavTop
      } else {
        this.sideNavTop = sideNavTop
      }
      console.log('this.left', this.left)
      console.log('this.top', this.top)
      console.log('this.sideNavLeft', this.sideNavLeft)
      console.log('this.sideNavTop', this.sideNavTop)
      requestAnimationFrame(() => {
        // 显示目录列表
        this.$refs.sideNav.style.opacity = 1
      })
    },
    // 点击悬浮按钮的回调
    handleFloatClick () {
      console.log('弹出目录')
      // 隐藏FloatButton
      this.isShowFlotatButton = false

      // 展开目录列表
      this.isShowCategoryNav = true
    }
  }
}
</script>

<style lang="less">
.app-float-button {
  position: fixed;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0px -5px 20px 0px rgba(0, 0, 0, 0.13),
    1px 1px 20px 2px rgba(0, 0, 0, 0.13), 2px 5px 18px 0px rgba(0, 0, 0, 0.14),
    -1px 0px 20px 0px rgba(0, 0, 0, 0.13);
  color: #fff;
  touch-action: none; /* 禁用默认的触摸行为 */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* 禁用点击时的高亮 */
  &:active {
    outline: none;
  }
}
.app-side-nav {
  position: fixed;

  opacity: 0;
  z-index: 99;
}
</style>
