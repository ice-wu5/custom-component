<template>
  <div class="popover-box">
    <PopOver>
      <template #trigger>
        <button>点击出现popover</button>
      </template>
      <template>提示内容</template>
    </PopOver>
  </div>
</template>

<script>
import PopOver from '@/views/Popover/Popover.vue'
export default {
  name: 'PopoverBox',
  components: {
    PopOver
  }
}
</script>

<style lang="less" scoped>
</style>>
