<template>
  <div class="side-nav" v-show="isShow">
    <Transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="handleAfterEnter"
    >
      <div class="side-nav-content" v-if="isShow">
        <div class="left">
          <slot></slot>
        </div>
        <div class="right" @click="handleClick">&gt;</div>
      </div>
    </Transition>
  </div>
</template>

<script>
// import CategoryList from '@/components/CategoryList/index.vue'
export default {
  name: 'SideNav',
  props: {
    isShow: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    handleClick () {
      this.$emit('collapse')
    },
    beforeEnter (el) {
      el.style.width = 0
    },
    enter (el, done) {
      console.log('enter执行了')
      // 强制重绘
      el.style.width = 'auto'
      const w = el.clientWidth
      el.style.width = 0
      console.log('w', w)
      // 使用 requestAnimationFrame 确保过渡效果生效
      requestAnimationFrame(() => {
        el.style.width = w + 'px'
        el.style.transition = '0.2s'
        done()
        // el.addEventListener('transitionend', done)
      })
    },
    handleAfterEnter (el, done) {
      // el.style.width = 0
      el.style.transition = 'none'
      done()
      // el.addEventListener('transitionend', done)
    }
  }
  // components: { CategoryList },

}
</script>

<style lang="less" scoped>
.side-nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 20px;
  background: #535c8e;
  border-radius: 5%;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
}
.right {
  color: #fff;
  margin-left: 40px;
  cursor: pointer;
  &:hover {
    color: rgb(109, 109, 222);
  }
}
</style>>
