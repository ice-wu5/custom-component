<template>
  <div class="container">
    <div class="tip posi-re">
      <slot></slot>
      <!-- 提示框，位置和内容由父组件传入 -->
      <div
        v-if="visible"
        :style="{
          top: tooltipPosition.top + 'px',
          left: tooltipPosition.left + 'px',
        }"
        class="tooltip"
      >
      <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TipRight',
  props: {
    tipList: {
      type: Array
    },
    visible: {
      type: Boolean,
      default: false
    },
    tooltipPosition: { // 提示框位置
      type: Object,
      default: () => ({ top: 0, left: 0 })
    },
    tooltipContent: { // 提示框内容
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>

.tooltip {
  position: absolute;
  background-color: #eacbcb;
  border: 1px solid #e1c9c9;
  padding: 10px;
}
</style>>
