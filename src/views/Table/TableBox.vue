<template>
  <div class="tablebox-container">
    <div class="table">
      <div class="table-header flex">
        <div class="height30 bgcceeeff"
        v-for="(item,index) in titleList"
        :key="item.id"
        :class="{
          width40:index===0,
          width12:index!==0
        }"
      >{{item}}</div>

      </div>
      <div class="table-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableBox',
  props: {
    tableData: {
      type: Array
    },
    titleList: {
      type: Array
    }
  }
}
</script>

<style lang="less" scoped>
.flex{
  display: flex;
}
.align-items-center{
  align-items: center;
}
.justify-content-center{
  justify-content: center;
}

.width40{
  width:40%
}
.width12{
  width: 12%;
}
.height30{
  line-height: 30px;
  text-align: center;
}
.bgcceeeff{
  background-color: #ceeeff;
}
.table-body{
  height: 300px;
  overflow-y: auto;
}
</style>>
