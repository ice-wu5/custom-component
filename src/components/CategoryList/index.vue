<template>
  <ul class="category-list">
    <li v-for="(item, index) in list" :key="index" class="category-li">
      <div
        class="label"
        @click="handleClick(item)"
        :style="{
          'font-size': 16 - 2 * (item.level - 1) + 'px',
        }"
        :class="{ isActive: item.isActive }"
      >
        {{ item.label }}
      </div>
      <CategoryList
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
    }
  },
  mounted () {
    console.log('list', this.list)
  }
}
</script>

<style lang="less" scoped>
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
