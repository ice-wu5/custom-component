<template>
  <div class="container">
    <!-- <div class="mask" v-if="isVisible" @click.self="closeDialog"> -->
    <div class="dialog-box">
      <!-- <div class="header">
          <div class="close c-pointer" >X</div>
        </div> -->
      <div class="tac">我是自定义内容</div>
      <div class="tac">我是自定义内容</div>
      <div class="tac">我是自定义内容</div>
      <div class="tac">我是自定义内容</div>
      <div class="tac">我是自定义内容</div>
      <div class="tac">我是自定义内容</div>
      <div class="tac">我是自定义内容</div>
      <div class="tac">我是自定义内容</div>
      <div class="tac">我是自定义内容</div>
      <slot name="content"></slot>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  // props: {
  //   isVisible: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  name: 'NoMaskDialogBox',
  methods: {
    closeDialog () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.content {
  background-color: #d89a9a;
}

.dialog-box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  padding: 10px;
  background-color: #ce8d8d;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
