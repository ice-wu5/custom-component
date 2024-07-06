<template>
  <div id="app" draggable="true" @dragover="onDragOver" @drop="onDrop">
    <router-view />
    <div
      class="app-float-button"
      ref="floatButton"
      draggable="true"
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
  name: 'AppPc',
  components: {
    FloatButton,
    SideNav,
    CategoryList
  },
  data () {
    return {
      top: 50, // 初始位置
      left: 50, // 初始位置
      isDragging: false,
      startX: 0,
      startY: 0,
      isShowFlotatButton: false, // control FloatButton to show
      isShowCategoryNav: false,
      categoryList: [
        {
          label: '手风琴',
          jumpRouterName: 'accordion',
          level: 1,
          children: [
            {
              label: '会话框',
              jumpRouterName: 'dialog',
              level: 2

            },
            {
              label: '无遮罩对话框',
              jumpRouterName: 'nomaskdialog',
              level: 2

            }
          ]
        },
        {
          label: '表格',
          jumpRouterName: 'table',
          level: 1,

          children: [
            {
              label: 'popover',
              jumpRouterName: 'popover',
              level: 2

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
    // onMouseDown (event) {
    //   this.startDrag(event.clientX, event.clientY)
    //   window.addEventListener('mousemove', this.onMouseMove)
    //   window.addEventListener('mouseup', this.onMouseUp)
    // },
    // onTouchStart (event) {
    //   // event.preventDefault() // 禁用默认的触摸行为
    //   const touch = event.touches[0]
    //   this.startDrag(touch.clientX, touch.clientY)
    //   window.addEventListener('touchmove', this.onTouchMove)
    //   window.addEventListener('touchend', this.onTouchEnd)
    // },
    // startDrag (clientX, clientY) {
    //   this.dragging = true
    //   this.startX = clientX - this.left
    //   this.startY = clientY - this.top
    // },
    // onMouseMove (event) {
    //   if (this.dragging) {
    //     this.updatePosition(event.clientX, event.clientY)
    //   }
    // },
    // onTouchMove (event) {
    //   const touch = event.touches[0]
    //   if (this.dragging) {
    //     this.updatePosition(touch.clientX, touch.clientY)
    //   }
    // },
    // onMouseUp () {
    //   this.endDrag()
    // },
    // onTouchEnd () {
    //   this.endDrag()
    // },
    // updatePosition (clientX, clientY) {
    //   // 计算新的位置
    //   let newLeft = clientX - this.startX
    //   let newTop = clientY - this.startY

    //   // 获取按钮和视口的尺寸
    //   const buttonWidth = this.$refs.floatButton.offsetWidth
    //   const buttonHeight = this.$refs.floatButton.offsetHeight
    //   const viewportWidth = window.innerWidth
    //   const viewportHeight = window.innerHeight

    //   // 限制新位置在视口边界内
    //   newLeft = Math.max(0, Math.min(newLeft, viewportWidth - buttonWidth))
    //   newTop = Math.max(0, Math.min(newTop, viewportHeight - buttonHeight))

    //   // 更新位置
    //   this.left = newLeft
    //   this.top = newTop
    // },
    // endDrag () {
    //   this.dragging = false
    //   window.removeEventListener('mousemove', this.onMouseMove)
    //   window.removeEventListener('mouseup', this.onMouseUp)
    //   window.removeEventListener('touchmove', this.onTouchMove)
    //   window.removeEventListener('touchend', this.onTouchEnd)
    // },

    // onDragEnter (e) {
    //   // console.log('onDragEnter', e)
    // },
    onDrop (e) {
      e.preventDefault()
      // 获取按钮和视口的尺寸
      const buttonWidth = this.$refs.floatButton.offsetWidth
      const buttonHeight = this.$refs.floatButton.offsetHeight
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      let newLeft = e.clientX - buttonWidth / 2
      let newTop = e.clientY - buttonHeight / 2

      // 限制新位置在视口边界内
      newLeft = Math.max(0, Math.min(newLeft, viewportWidth - buttonWidth))
      newTop = Math.max(0, Math.min(newTop, viewportHeight - buttonHeight))

      console.log('newLeft', newLeft)
      console.log('newTop', newTop)
      // 更新位置
      this.left = newLeft
      this.top = newTop
    },
    onDragOver (e) {
      e.preventDefault()
      // e.target.style.outline = 'none'
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
      // 添加透明图像
      // const img = new Image()
      // img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
      // e.dataTransfer.setDragImage(img, 0, 0)
    },
    onMouseDown (event) {
      this.isDragging = true
      this.startX = event.clientX - this.left
      this.startY = event.clientY - this.top
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    },
    onMouseMove (event) {
      if (this.isDragging) {
        this.left = event.clientX - this.startX
        this.top = event.clientY - this.startY
      }
    },
    onMouseUp () {
      this.isDragging = false
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    },
    // onDrop (e) {
    //   e.preventDefault()
    //   this.isDragging = false
    // },
    // onDragOver (e) {
    //   e.preventDefault()
    // },
    onDrag (event) {
      // if (this.dragging) {
      //   this.left = event.clientX - this.startX
      //   this.top = event.clientY - this.startY
      // }
    },
    onDragEnd (e) {
      // 计算新的位置
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
  filter: drop-shadow(0px 2px 15px rgba(0, 0, 0, 0.5));
  overflow: hidden;
}

.app-side-nav {
  position: fixed;
  left: 10%;
  top: 20%;
  z-index: 99;
}
</style>
