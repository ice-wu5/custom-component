<template>
  <div class="container">
    <CardItem>
      <div class="tips" @mouseenter="showTooltip" @mouseleave="hideTooltip">
        <TipRisght
          :tipList="tipList"
          :visible="visible"
          :tooltipPosition="tooltipPosition"
          :tooltipContent="tooltipContent"
        >
          <div class="c-pointer button active">按钮</div>
          <template #content>
            <transition name="fade" :key="tipList.length">
              <ul>
                <li v-for="(item, index) in tipList" :key="index">
                  {{ item.title }}
                </li>
              </ul>
            </transition>
          </template>
        </TipRisght>
      </div>
    </CardItem>
    <div class="table">
      <div class="left">
        <div class="left-con" ref="leftCon">
          <ul
            ref="left"
            class="left-list prevent smooth"
            @touchstart="leftTouchStart"
          >
            <li class="big" v-for="(item, index) in 100" :key="index">
              123444
            </li>
          </ul>
        </div>
      </div>

      <div class="right">
        <div class="right-con" ref="rightCon">
          <ul
            ref="right"
            class="right-list prevent smooth"
            @touchstart="rightTouchStart"
          >
            <li class="small" v-for="(item, index) in 100" :key="index">
              55555555
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TipRisght from '@/views/Tip/TipRight.vue'
import CardItem from '@/components/Card/Card.vue'
export default {
  name: 'TipIndex',
  components: {
    TipRisght,
    CardItem
  },
  data () {
    return {
      tipList: [
        {
          title: '第1项'
        },
        {
          title: '第2项'
        },
        {
          title: '第3项'
        },
        {
          title: '第4项'
        },
        {
          title: '第5项'
        }
      ],
      visible: false,
      tooltipContent: '我是提示内容',
      tooltipPosition: {
        left: 120,
        top: 20
      }
    }
  },
  mounted () {
    this.$refs.left.addEventListener('scroll', this.leftTouchMove)
    this.$refs.right.addEventListener('scroll', this.rightTouchMove)
  },
  beforeDestroy () {
    this.$refs.left.removeEventListener('scroll', this.leftTouchMove)
    this.$refs.right.removeEventListener('scroll', this.rightTouchMove)
  },
  methods: {
    leftTouchStart () {
      this.$refs.right.removeEventListener('scroll', this.rightTouchMove)
      this.$refs.left.addEventListener('scroll', this.leftTouchMove)
    },
    rightTouchStart () {
      this.$refs.left.removeEventListener('scroll', this.leftTouchMove)
      this.$refs.right.addEventListener('scroll', this.rightTouchMove)
    },
    leftTouchMove () {
      console.log('左侧scroll监听的回调')
      this.$refs.right.scrollTop = this.$refs.left.scrollTop * (20 / 26)

      // requestAnimationFrame(() => {
      //   requestAnimationFrame(() => {
      //     this.$refs.right.scrollTop = this.$refs.left.scrollTop * (20 / 26)
      //     console.log('this.$refs.left.scrollTop', this.$refs.left.scrollTop)
      //     console.log('this.$refs.right.scrollTop', this.$refs.right.scrollTop)
      //     console.log('已设置右侧scroll值变化')
      //   })
      // })
    },
    rightTouchMove () {
      console.log('右侧scroll监听的回调')

      this.$refs.left.scrollTop = this.$refs.right.scrollTop / (20 / 26)

      // requestAnimationFrame(() => {
      //   requestAnimationFrame(() => {
      //     this.$refs.left.scrollTop = this.$refs.right.scrollTop / (20 / 26)
      //   })
      // })
    },
    // leftMouseEnter () {
    //   console.log('leftMouseEnter')
    //   this.$refs.right.scrollTop = this.$refs.left.scrollTop * (20 / 26)
    // },
    // rightMouseEnter () {
    //   this.$refs.left.scrollTop = this.$refs.right.scrollTop / (20 / 26)
    // },
    // handleLeftScroll () {
    //   this.$refs.right.removeEventListener('touchmove', this.handleRight)
    // },
    // handleRightScroll () {
    //   this.$refs.left.removeEventListener('touchmove', this.handleLeft)
    // },
    // handleLeftEnter () {
    //   // this.$refs.leftCon.style.overflow = 'scroll'

    //   // this.$refs.right.style.overflow = 'visible'
    // },
    // handleLeftLeave () {
    //   // this.$refs.rightCon.style.overflow = 'scroll'
    // },
    // handleRightEnter () {
    //   // this.$refs.rightCon.style.overflow = 'scroll'

    //   // this.$refs.left.style.overflow = 'visible'
    // },
    // handleRightLeave () {
    //   // this.$refs.leftCon.style.overflow = 'scroll'

    //   // this.$refs.left.style.overflow = 'scroll'
    // },
    // handleLeft (e) {
    //   // 获取需要触发滚动事件的元素
    //   const element = this.$refs.left

    //   // 创建滚动事件
    //   const touchMoveEvent = new Event('scroll')

    //   // 触发滚动事件
    //   element.dispatchEvent(touchMoveEvent)

    //   // console.log('1222')
    //   // console.log(this.$refs.left.scrollHeight)

    //   // this.$refs.right.scrollTop = this.$refs.left.scrollTop * (20 / 26)
    //   // this.$refs.left.removeEventListener('scroll', this.handleLeft)
    //   // this.$refs.right.removeEventListener('scroll', this.handleRight)
    //   // this.$refs.rightCon.style.overflow = 'visible'
    //   this.$refs.right.scrollTop = this.$refs.left.scrollTop * (20 / 26)
    //   // console.log('left request')

    //   // this.$refs.right.style.transform = `translateY(${-this.$refs.leftCon.scrollTop * 0.64}px)`
    //   // this.$refs.right.style.transform = `'translateY(${-this.$refs.left.scrollTop * 0.64})px'`
    // },
    // handleRight (e) {
    //   // console.log(this.$refs.right.scrollHeight)
    //   this.$refs.left.scrollTop = this.$refs.right.scrollTop / (20 / 26)
    //   // console.log('right request')
    // },
    showTooltip () {
      console.log('mouseenter触发了')
      this.visible = true
    },
    hideTooltip () {
      console.log('mouseleave触发了')

      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.prevent {
  overscroll-behavior-y: none;
}
.smooth {
  scroll-behavior: auto;
}
.table {
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
}
.right {
  overflow: hidden;
  width: 48%;
  height: 400px;
}
.left {
  overflow: hidden;
  width: 48%;
  height: 400px;
}
.left-con {
  height: 400px;
  overflow: scroll;
  position: relative;
}
.right-con {
  height: 400px;
  overflow: scroll;
  position: relative;
}
.left-list {
  height: 400px;
  position: absolute;
  overflow-y: auto;
}
.right-list {
  height: 400px;
  position: absolute;

  overflow-y: auto;
}
.big {
  height: 30px;
  &:nth-child(2n) {
    background-color: pink;
  }
  &:nth-child(2n-1) {
    background-color: rgb(213, 238, 73);
  }
}
.small {
  height: 24px;
  &:nth-child(2n) {
    background-color: pink;
  }
  &:nth-child(2n-1) {
    background-color: rgb(213, 238, 73);
  }
}
.bgc-pink {
  background-color: pink;
}
.tips {
  height: 40px;
  background-color: #d0c3bd;
  text-align: center;
  color: #fff;
  line-height: 40px;
}
.button {
  width: 100px;
  height: 50px;
  background-color: #de3d3d;
  opacity: 1;
  transform: scale(1);
  transition: 0.95s;
}
.button.active {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>>
