<template>
  <div class="float-button-container" v-show="isShow">
    <div
      class="float-button"
      @click="handleClick"
      :style="{
        width: size + 'px',
        height: size + 'px',
        lineHeight: size + 'px',
      }"
    >
      &Congruent;
    </div>
  </div>
</template>

<script>
export default {
  name: 'FloatButton',
  props: {
    size: {
      type: Number,
      default: 50
    },
    isShow: {
      type: Boolean,
      default: false,
      required: true
    }

  },
  watch: {
    // isShow (res) {
    //   console.log('子组件接受的isShow', res)
    // }
  },
  methods: {
    // onDragOver (e) {
    //   console.log('float-onDragOver', e.target)
    // },
    handleClick () {
      this.$emit('floatClick')
    }
  }
}
</script>

<style lang="less" scoped>
.float-button {
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  background: radial-gradient(circle, rgb(18, 28, 216), rgb(154, 157, 221));
  font-size: 20px;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.13),
    0 6px 10px 0 rgba(0, 0, 0, 0.13), 0 12px 24px 10px rgba(0, 0, 0, 0.14);
  color: #fff;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
  transition: 0.5s;
}
</style>>
