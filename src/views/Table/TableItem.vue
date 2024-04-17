<template>
  <div class="table-item-container">
    <div class="table-row" v-for="(item,index) in hasIsExpandTableData" :key="item.id"
    >
      <div class="level-1 flex height40" :class="{dark:index%2!==0,light:index%2===0}">
        <div class="id width40"
        :style=" {'padding-left':getPaddingLeft(item.level)}">

        <div class="title position-relative">
          <div class="title-detail display-inline-block position-relative">{{item.id}}
            <span v-if="item.children && item.children.length" class="expand" @click="item.isExpand=!item.isExpand"></span>

          </div>

        </div>

      </div>
        <div class="name width12 cursor-pointer" @click="seeDetail(item)">{{item.name}}</div>
        <div class="age width12">{{item.age}}</div>
        <div class="sex width12">{{item.sex}}</div>
        <div class="address width12">{{item.address}}</div>
        <div class="date width12">{{item.date}}</div>
      </div>
      <div v-if="item.isExpand===true" class="level-2" :class="{dark:index/2===0,light:index/2!==0}">
        <TableItem :tableData="item.children" @seeDetail="seeDetail"></TableItem>
      </div>
    </div>
  </div>
</template>

<script>
import { addIsExpand } from '@/utils/common.js'
import TableItem from '@/views/Table/TableItem.vue'
export default {
  name: 'TableItem',
  comments: {
    TableItem
  },
  props: {
    tableData: {
      type: Array
    }
  },
  data () {
    return {
      hasIsExpandTableData: []
    }
  },
  // watch: {
  //   tableData: {
  //     handler (newVal) {
  //       this.setNewData(newVal)
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
  mounted () {
    const res = addIsExpand(JSON.parse(JSON.stringify(this.tableData)))
    // debugger
    console.log(res)
    this.hasIsExpandTableData = res
    // this.setNewData(this.copiedData)
    // console.log(this.hasIsExpandTableData)
  },
  computed: {
    copiedData () {
      return JSON.parse(JSON.stringify(this.tableData))
    }
  },
  methods: {
    seeDetail (item) {
      this.$emit('seeDetail', item)
    },
    getPaddingLeft (level) {
      return (level - 1) * 55 + 'px'
    },
    addIsEdit (arr) {
      return arr.map(item => {
        // 创建一个新对象，保持原对象的属性不变
        const newItem = { ...item, isExpand: false }
        // 如果当前数组元素有 children 属性且是数组，则递归处理 children 数组元素
        if (item.children && Array.isArray(item.children) && item.children.length) {
          newItem.children = this.addIsEdit(item.children)
        }
        return newItem
      })
    },
    addIsExpandToTableData (tableData) {
      return tableData.map(item => {
        const newItem = {
          ...item,
          isExpand: false
        }
        if (item.children && item.children.length) {
          newItem.children = this.addIsExpandToTableData(item.children)
        }
        return newItem
      })
    },
    setNewData (tableData) {
      this.hasIsExpandTableData = addIsExpand(tableData)
    }
  }
}
</script>

<style lang="less" scoped>
.flex{
  display: flex;
}
.width40{
  width: 40%;
}
.width12{
  width: 12%;
}
.height40{
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.dark{
  background-color: #2d98e4;
}
.light{
  background-color: #e8e839;
}
.expand{
  position: absolute;
  top:50%;
  right:-30px;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #e13a3a;
  cursor: pointer;
}
.cursor-pointer{
  cursor: pointer;

}
.position-relative{
  position: relative;
}
.display-inline-block{
  display: inline-block;
}
</style>>
