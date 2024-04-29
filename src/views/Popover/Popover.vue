<template>
  <div class="popover-container">
    <slot name="trigger" ref="trigger"></slot>
    <transition name="fade">
      <div class="popover-content" v-if="visible">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'PopOver',
  data () {
    return {
      visible: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      const trigger = this.$refs.trigger
      if (trigger) {
        trigger.addEventListener('click', this.togglePopover)
        document.addEventListener('click', this.closePopoverOutside)
      }
    })
  },
  methods: {
    togglePopover () {
      console.log('点击了按钮')
      this.visible = !this.visible
      // if (this.visible) {
      //   // 当提示框打开时，监听整个文档的点击事件
      //   document.addEventListener('click', this.closePopoverOutside)
      // } else {
      //   // 当提示框关闭时，移除文档点击事件监听
      //   document.removeEventListener('click', this.closePopoverOutside)
      // }
    },
    closePopoverOutside (event) {
      // 判断点击的位置是否在提示框内部
      if (!this.$el.contains(event.target)) {
        this.visible = false
      }
    }
  },
  beforeDestroy () {
    // 在组件销毁前，确保移除文档点击事件监听
    document.removeEventListener('click', this.closePopoverOutside)
  }

}
</script>

<style lang="less" scoped>
.popover-content {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 9999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>>
