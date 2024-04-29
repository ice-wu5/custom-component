<template>
  <div class="container">
    <!-- <div class="mask" v-if="isVisible" @click.self="closeDialog"> -->
    <div class="dialog-box">
      <slot name="reference" ref="reference"></slot>
      <slot class="content" v-if="isVisible"></slot>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      isVisible: false
    }
  },
  // props: {
  //   isVisible: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  name: 'NoMaskDialogBox',
  // methods: {
  //   closeDialog () {
  //     this.$emit('close')
  //   }
  // },
  mounted () {
    console.log(this)

    const reference = this.$slots.reference[0].elm
    console.log(reference)
    if (reference) {
      reference.addEventListener('click', this.handleButtonClick)
    }
  },
  methods: {
    handleButtonClick () {
      console.log('点击了')

      this.isVisible = !this.isVisible
      // 添加点击事件监听器，以关闭弹窗
      document.addEventListener('click', this.closeModalOutside)
    },
    closeModal () {
      this.isVisible = false
      // 移除点击事件监听器
      document.removeEventListener('click', this.closeModalOutside)
    },
    closeModalOutside (event) {
      console.log('38line', this)
      // 如果点击的目标不在弹窗内部，则关闭弹窗
      if (!this.$el.contains(event.target)) {
        // this.showModal = false
        this.closeModal()
      }
    }
  }

}
</script>

<style lang="less" scoped>
.content {
  position: absolute;
  left: 10%;
  top: 10%;
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.dialog-box {
  position: relative;
}

.close {
  text-align: end;
  padding: 5px;
}

.footer {
  justify-content: space-around;
  padding: 5px;
}

.cancle,
.comfirm {
  padding: 5px;
  background-color: #fc8416;
  border-radius: 5px;
  color: #fff;
}
</style>>
