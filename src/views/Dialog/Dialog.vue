<template>
  <div class="container">
    <div class="button" @click="isVisible=true">点我弹出会话框</div>
    <DialogBox :isVisible="isVisible" @close="close">
      <div class="tac">我是自定义内容</div>
      <div class="tac">我是自定义内容</div>
      <div class="tac">我是自定义内容</div>
      <div class="tac">我是自定义内容</div>
      <div class="tac">我是自定义内容</div>
      <div class="tac">我是自定义内容</div>
      <div class="tac">我是自定义内容</div>
      <div class="tac">我是自定义内容</div>
      <div class="tac">我是自定义内容</div>
    </DialogBox>
  </div>
</template>

<script>
import DialogBox from '@/views/Dialog/DialogBox.vue'
export default {
  name: 'DialogIndex',
  components: {
    DialogBox
  },
  data () {
    return {
      isVisible: false
    }
  },
  methods: {
    close () {
      this.isVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.button{
  width: 200px;
  height: 40px;
  background-color: #FD742D;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  color: #fff;
}
</style>>
