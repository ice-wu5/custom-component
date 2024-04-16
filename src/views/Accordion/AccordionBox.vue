<template>
  <div class="container">
    <div class="accordion flex">
      <div
        class="accordion-item flex"
        v-for="(item, index) in myList"
        :key="index">
        <div
          class="accordion-title"
          :style="{backgroundImage: 'url(' + `${item.imgUrl}` + ')'}"

        >
          <span>{{ item.title }}</span>
          <span class="more c-pointer" @click="changeItem(item.id, index)"
            >展开</span>
        </div>
        <div
          :ref="`content${index}`"
          class="accordion-cintent"
          v-if="item.isActive"
          :style="{ backgroundImage: `url(${item.imgUrl}` }">
        <div>{{ item.content.subTitle }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AcccordionBox',
  props: {
    accordionList: {
      type: Array
    }
  },
  data () {
    return {
      myList: this.accordionList
    }
  },
  methods: {
    changeData (data) {
      this.myList = data
    },
    changeItem (id, index) {
      console.log('345')
      this.$emit('changeItem', id)
    }
  }
}

</script>

<style lang="less" scoped>
.accordion {
  width: 1000px;
  height: 200px;
}
.accordion-title {
  width: 100px;
  height: 200px;
  background-color: #d39e9e;
  text-align: center;
  position: relative;
  .more {
    padding: 5px;
    background-color: #FD742D;
    border-radius: 10px;
    position: absolute;
    right: 0;
    bottom: 0;
    color: #fff;
  }
}
.accordion-item {
  transition: width 0.5s; /* 添加过渡效果 */
}

.accordion-cintent {
  width: 200px;
  height: 200px;
  background-color: #c1e299;
}
</style>>
