<template>
  <div class="side-nav" v-show="isShow" ref="sideNav">
    <Transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="handleAfterEnter"
    >
      <div class="side-nav-content" v-if="isShow">
        <div class="left" ref="content">
          <slot></slot>
        </div>
        <div class="right" @click="handleClick">&lt;</div>
      </div>
    </Transition>
  </div>
</template>

<script>
// import CategoryList from '@/components/CategoryList/index.vue'
export default {
  name: 'SideNav',
  data () {
    return {
      contentRectTop: 0,
      contentRectHeight: 0,
      scrollHeight: 0// 滚动内容区的总高度
    }
  },
  props: {
    labelRect: {
      type: Object,
      required: false
    },
    isShow: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  watch: {
    labelRect: {
      handler () {
        if (this.$refs.content) {
          this.scrollHeight = this.$refs.content.scrollHeight
          this.contentRectTop = this.$refs.content.getBoundingClientRect().top
          this.contentRectHeight = this.$refs.content.getBoundingClientRect().height
          this.scrollToActive()
        }
      },
      immediate: true,
      deep: true
    },
    scrollHeight: {
      handler () {
        this.scrollToActive()
      },
      immediate: true,
      deep: true
    }

  },
  // mounted () {
  //   // 获取元素属性
  //   if (this.$refs.content) {

  //     console.log('this.$refs.content.scrollHeight', this.$refs.content.scrollHeight)
  //   }
  // },
  computed: {
    // 是否存在滚动，滚动高度与容器可见高度的差值
    scrollDes () {
      return this.scrollHeight - this.contentRectHeight
    }
  },
  methods: {
    // 滚动到activeLabel
    scrollToActive () {
      console.log('this.scrollHeight', this.scrollHeight)
      if (this.scrollHeight > 0) {
        const scrollTop = this.getScrollTop()
        console.log('setScrollTop', scrollTop)
        this.$nextTick(() => {
          this.$refs.content.scrollTop = scrollTop
        })
      }
    },
    // 获取需要滚动的距离
    getScrollTop () {
      if (this.labelRect) {
        const des = this.contentRectTop + this.contentRectHeight / 2 - this.labelRect.rectHeight / 2
        const scrollTop = this.labelRect.rectTop - des
        const limit = this.scrollHeight - this.contentRectHeight
        if (scrollTop >= limit) {
          return limit
        } else {
          return scrollTop
        }
      } else {
        return 0
      }
    },
    // 点击右侧箭头的回调
    handleClick () {
      this.$emit('collapse')
    },
    // 过渡开始前
    beforeEnter (el) {
      el.style.width = 0
      // el.style.transform = 'translateX(-30px)'
    },
    // 过渡开始
    enter (el, done) {
      console.log('enter执行了')

      el.style.width = 'auto'
      // 获取元素宽度
      const w = el.offsetWidth
      console.log('w', w)
      // 传递元素宽度给父组件
      this.$emit('getWidth', w)
      el.style.width = 0
      // 使用 requestAnimationFrame 确保过渡效果生效
      requestAnimationFrame(() => {
        el.style.width = w + 'px'
        // 偏移量
        const offsetWidth = 30
        el.style.transform = `translateX(-${offsetWidth}px)`

        el.style.transition = '0.2s'
        done()
        console.log('transitionEnd')
        this.$emit('transitionEnd')
        // el.addEventListener('transitionend', done)
      })
    },
    // 过渡开始后
    handleAfterEnter (el, done) {
      // el.style.width = 0
      el.style.transition = 'none'
      done()

      // console.log('transitionEnd')
      // this.$emit('transitionEnd')
      // console.log('transitionEnd')
      // this.$emit('transitionEnd')
      // el.addEventListener('transitionend', done)
    },
    handleAfterLeave () {
      // console.log('transitionEnd')
      // this.$emit('transitionEnd')
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
  background: rgba(58, 97, 178, 0.65);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 5%;
  box-shadow: 0 0 80px rgba(0, 0, 0, 0.2);
}
.left {
  max-height: 200px;
  overflow-y: auto;
}
.right {
  color: #fff;
  cursor: pointer;
  padding-left: 7px;
  &:hover {
    color: rgb(74, 74, 79);
  }
}
</style>>
