<template>
  <ul class="category-list" ref="categoryList">
    <li v-for="(item, index) in list" :key="index" class="category-li">
      <div
        class="label"
        ref="label"
        :data-active="item.isActive ? 'active' : ''"
        @click="handleClick(item)"
        :style="{
          'font-size': 16 - 2 * (item.level - 1) + 'px',
        }"
        :class="{ isActive: item.isActive }"
      >
        {{ item.label }}
      </div>
      <CategoryList
        ref="childCategoryList"
        @changeCategory="handleClick"
        :list="item.children"
      ></CategoryList>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CategoryList',

  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allLabels: []
    }
  },
  computed: {
    activeLabel () {
      return this.allLabels.find(item => item.dataset.active)
    }
  },
  methods: {
    // handleChildClick (item) {
    //   if (item.isActive) {
    //     return
    //   }
    //   console.log('孙组件的item', item)
    //   this.$emit('changeCategory', item)
    // },
    handleClick (item) {
      if (item.isActive) {
        return
      }
      console.log('子组件的item', item)
      this.$emit('changeCategory', item)
    },
    // 获取所有label-递归寻找
    getAllLabels (refs = this.$refs) {
      const labels = []
      if (refs.label) {
        if (Array.isArray(refs.label)) {
          labels.push(...refs.label)
        } else {
          labels.push(refs.label)
        }
      }
      if (refs.childCategoryList) {
        if (Array.isArray(refs.childCategoryList)) {
          refs.childCategoryList.forEach(childRef => {
            labels.push(...childRef.getAllLabels())
          })
        } else {
          labels.push(...refs.childCategoryList.getAllLabels())
        }
      }
      return labels
    },

    getActiveLabelRect () {
      // let scrollTop
      if (this.activeLabel) {
        const rectTop = this.activeLabel.getBoundingClientRect().top
        const rectHeight = this.activeLabel.getBoundingClientRect().height
        console.log('rectTop', rectTop)
        console.log('rectTop', rectTop)
        return {
          rectTop,
          rectHeight
        }
      }

      // this.$nextTick(() => {
      //   const categoryList = this.$refs.categoryList
      //   const activeLabel = this.activeLabel

      //   if (activeLabel && categoryList) {
      //     const categoryListRect = categoryList.getBoundingClientRect()
      //     const labelRect = activeLabel.getBoundingClientRect()
      //     rectTop = labelRect.top
      //     rectHeight = labelRect.height
      //     const categoryListMiddle = categoryListRect.top + (categoryListRect.height / 2)
      //     const labelMiddle = labelRect.top + (labelRect.height / 2)

      //     scrollTop = categoryList.scrollTop + (labelMiddle - categoryListMiddle)

      //     // Adjust scroll position to ensure it doesn't go out of bounds
      //     scrollTop = Math.max(0, Math.min(scrollTop, categoryList.scrollHeight - categoryList.clientHeight))
      //     const isLastLabel = labelRect.bottom > categoryListRect.bottom
      //     if (isLastLabel) {
      //       scrollTop = categoryList.scrollHeight - categoryList.clientHeight
      //     }
      //   }
      // })
    }

  },
  mounted () {
    // console.log('list', this.list)
    // console.log('label', this.getAllLabels())
    // console.log('activeLabel', this.activeLabel)
    this.allLabels = this.getAllLabels()
    console.log('activeLabel', this.activeLabel)

    const activeLabelRect = this.getActiveLabelRect()
    this.$nextTick(() => {
      if (activeLabelRect) {
        this.$emit('scrollToActive', activeLabelRect)
      }
    })
  }
}
</script>

<style lang="less" scoped>
.category-list {
  padding-right: 7px;
}
.isActive {
  color: rgb(230, 255, 2) !important;
}

.category-li {
  line-height: 35px;
  cursor: pointer;
  white-space: nowrap;
  .label {
    color: #fefefe;
    &:hover {
      color: rgb(162, 162, 187);
    }
  }

  .category-li {
    padding-left: 1em;
  }
}
</style>>
