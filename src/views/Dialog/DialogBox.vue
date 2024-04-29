<template>
  <div class="container">
    <div class="mask" v-if="isVisible" @click.self="closeDialog">
      <div class="dialog-box" @click.stop>
        <div class="header">
          <div class="close c-pointer" @click="closeDialog">X</div>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="footer flex">
          <div class="cancle c-pointer" @click="closeDialog">取消</div>
          <div class="comfirm c-pointer" @click="closeDialog">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  name: 'DialogBox',
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
  background-color: orange;
}
.dialog-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  padding: 10px;
  background-color: #fff;
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
