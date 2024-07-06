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
      top: 50, // 初始位置
      left: 50, // 初始位置
      dragging: false,
      startX: 0,
      startY: 0,
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
    onDrop (e) {
      let newLeft = e.clientX - this.startX
      let newTop = e.clientY - this.startY
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
  left: 10%;
  top: 20%;
  z-index: 99;
}
</style>
