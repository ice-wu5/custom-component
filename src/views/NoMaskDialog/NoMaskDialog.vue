<template>
  <div>
    <button @click="openModal">Open Modal</button>
    <Modal v-if="showModal">
      <div slot="content">
        <!-- 点击内容区不关闭弹窗 -->
        <h2>This is the modal content.</h2>
        <p>Clicking here won't close the modal.</p>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/views/NoMaskDialog/NoMaskDialogBox.vue'

export default {
  components: {
    Modal
  },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    openModal () {
      this.showModal = !this.showModal
      // 添加点击事件监听器，以关闭弹窗
      document.addEventListener('click', this.closeModalOutside)
    },
    closeModal () {
      this.showModal = false
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

</style>
