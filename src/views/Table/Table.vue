<template>
  <div class="container">
    <TableBox  :titleList="titleList">
      <TableItem :tableData="tableData" @seeDetail="seeDetail"></TableItem>
    </TableBox>
    <div @click="changeData" class="button">

    </div>
  </div>
</template>

<script>
import TableBox from './TableBox.vue'
import TableItem from '@/views/Table/TableItem.vue'
export default {
  name: 'TableIndex',
  components: { TableBox, TableItem },
  data () {
    return {
      titleList: [
        'id', '姓名', '年龄', '性别', '地址', '日期'
      ],
      tableData: [
        {
          id: 1,
          level: 1,
          name: '张三',
          age: '',
          sex: '男',
          address: '北京市朝阳区',
          date: '2022-01-01'
        },
        {
          id: 2,
          level: 1,
          name: '李四',
          age: 19,
          sex: '女',
          address: '北京市朝阳区',
          date: '2022-01-02',
          children: [
            {
              id: 21,
              level: 2,
              name: '李四1',
              age: 19,
              isExpand: false,
              sex: '女',
              address: '北京市朝阳区',
              date: '2022-01-02',
              children: [
                {
                  id: 211,
                  level: 3,
                  name: '李四11',
                  age: 19,
                  isExpand: false,
                  sex: '女',
                  address: '北京市朝阳区',
                  date: '2022-01-02',
                  children: []
                }
              ]
            },
            {
              id: 22,
              level: 2,
              name: '李四21',
              age: 19,
              isExpand: false,
              sex: '女',
              address: '北京市朝阳区',
              date: '2022-01-02',
              children: [
                {
                  id: 311,
                  level: 3,
                  name: '李四31',
                  age: 19,
                  isExpand: false,
                  sex: '女',
                  address: '北京市朝阳区',
                  date: '2022-01-02',
                  children: []
                }
              ]
            }
          ]
        },
        {
          level: 1,
          id: 3,
          name: '王五',
          age: 20,
          isExpand: false,
          sex: '男',
          address: '北京市朝阳区',
          date: '2022-01-03',
          children: [
            {
              level: 2,
              id: 31,
              name: '王五1',
              age: 20,
              isExpand: false,
              sex: '男',
              address: '北京市朝阳区',
              date: '2022-01-03',
              children: [
                {
                  level: 3,
                  id: 311,
                  name: '王五11',
                  age: 20,
                  isExpand: false,
                  sex: '男',
                  address: '北京市朝阳区',
                  date: '2022-01-03',
                  children: []
                },
                {
                  level: 3,
                  id: 312,
                  name: '王五12',
                  age: 20,
                  isExpand: false,
                  sex: '男',
                  address: '北京市朝阳区',
                  date: '2022-01-03',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    seeDetail (e) {
      console.log('父组件接收table传的数据', e)
    },
    changeData () {
      console.log('click了')
      this.tableData = [
        {
          id: 1,
          level: 1,
          name: 'a张三',
          age: 18,
          sex: '男',
          isExpand: false,
          address: '北京市朝阳区',
          date: '2022-01-01'
        },
        {
          id: 1,
          level: 1,
          name: 'a张三',
          age: 18,
          sex: '男',
          isExpand: false,
          address: '北京市朝阳区',
          date: '2022-01-01'
        },
        {
          id: 1,
          level: 1,
          name: 'a张三',
          age: 18,
          sex: '男',
          isExpand: false,
          address: '北京市朝阳区',
          date: '2022-01-01'
        },
        {
          id: 1,
          level: 1,
          name: 'a张三',
          age: 18,
          sex: '男',
          isExpand: false,
          address: '北京市朝阳区',
          date: '2022-01-01'
        },
        {
          id: 1,
          level: 1,
          name: 'a张三',
          age: 18,
          sex: '男',
          isExpand: false,
          address: '北京市朝阳区',
          date: '2022-01-01'
        },
        {
          id: 1,
          level: 1,
          name: 'a张三',
          age: 18,
          sex: '男',
          isExpand: false,
          address: '北京市朝阳区',
          date: '2022-01-01'
        },
        {
          id: 1,
          level: 1,
          name: 'a张三',
          age: 18,
          sex: '男',
          isExpand: false,
          address: '北京市朝阳区',
          date: '2022-01-01'
        },
        {
          id: 1,
          level: 1,
          name: 'a张三',
          age: 18,
          sex: '男',
          isExpand: false,
          address: '北京市朝阳区',
          date: '2022-01-01'
        },
        {
          id: 1,
          level: 1,
          name: 'a张三',
          age: 18,
          sex: '男',
          isExpand: false,
          address: '北京市朝阳区',
          date: '2022-01-01'
        },
        {
          id: 1,
          level: 1,
          name: 'a张三',
          age: 18,
          sex: '男',
          isExpand: false,
          address: '北京市朝阳区',
          date: '2022-01-01'
        },
        {
          id: 1,
          level: 1,
          name: 'a张三',
          age: 18,
          sex: '男',
          isExpand: false,
          address: '北京市朝阳区',
          date: '2022-01-01'
        },
        {
          id: 1,
          level: 1,
          name: 'a张三',
          age: 18,
          sex: '男',
          isExpand: false,
          address: '北京市朝阳区',
          date: '2022-01-01'
        },
        {
          id: 2,
          level: 1,
          name: 'a李四',
          age: 19,
          isExpand: false,
          sex: '女',
          address: '北京市朝阳区',
          date: '2022-01-02',
          children: [
            {
              id: 21,
              level: 2,
              name: 'a李四1',
              age: 19,
              isExpand: false,
              sex: '女',
              address: '北京市朝阳区',
              date: '2022-01-02',
              children: [
                {
                  id: 211,
                  level: 3,
                  name: 'a李四11',
                  age: 19,
                  isExpand: false,
                  sex: '女',
                  address: '北京市朝阳区',
                  date: '2022-01-02',
                  children: []
                }
              ]
            },
            {
              id: 22,
              level: 2,
              name: 'a李四21',
              age: 19,
              isExpand: false,
              sex: '女',
              address: '北京市朝阳区',
              date: '2022-01-02',
              children: [
                {
                  id: 311,
                  level: 3,
                  name: 'a李四31',
                  age: 19,
                  isExpand: false,
                  sex: '女',
                  address: '北京市朝阳区',
                  date: '2022-01-02',
                  children: []
                }
              ]
            }
          ]
        },
        {
          level: 1,
          id: 3,
          name: 'a王五',
          age: 20,
          isExpand: false,
          sex: '男',
          address: '北京市朝阳区',
          date: '2022-01-03',
          children: [
            {
              level: 2,
              id: 31,
              name: 'a王五1',
              age: 20,
              isExpand: false,
              sex: '男',
              address: '北京市朝阳区',
              date: '2022-01-03',
              children: [
                {
                  level: 3,
                  id: 311,
                  name: 'a王五11',
                  age: 20,
                  isExpand: false,
                  sex: '男',
                  address: '北京市朝阳区',
                  date: '2022-01-03',
                  children: []
                },
                {
                  level: 3,
                  id: 312,
                  name: 'a王五12',
                  age: 20,
                  isExpand: false,
                  sex: '男',
                  address: '北京市朝阳区',
                  date: '2022-01-03',
                  children: []
                }
              ]
            }
          ]
        },
        {
          level: 1,
          id: 4,
          name: 'a王五',
          age: 20,
          isExpand: false,
          sex: '男',
          address: '北京市朝阳区',
          date: '2022-01-03',
          children: [
            {
              level: 2,
              id: 41,
              name: 'a王五1',
              age: 20,
              isExpand: false,
              sex: '男',
              address: '北京市朝阳区',
              date: '2022-01-03',
              children: [
                {
                  level: 3,
                  id: 411,
                  name: 'a王五11',
                  age: 20,
                  isExpand: false,
                  sex: '男',
                  address: '北京市朝阳区',
                  date: '2022-01-03',
                  children: []
                },
                {
                  level: 3,
                  id: 412,
                  name: 'a王五12',
                  age: 20,
                  isExpand: false,
                  sex: '男',
                  address: '北京市朝阳区',
                  date: '2022-01-03',
                  children: []
                }
              ]
            }
          ]
        },
        {
          level: 1,
          id: 5,
          name: 'a王五',
          age: 20,
          isExpand: false,
          sex: '男',
          address: '北京市朝阳区',
          date: '2022-01-03',
          children: [
            {
              level: 2,
              id: 51,
              name: 'a王五1',
              age: 20,
              isExpand: false,
              sex: '男',
              address: '北京市朝阳区',
              date: '2022-01-03',
              children: [
                {
                  level: 3,
                  id: 511,
                  name: 'a王五11',
                  age: 20,
                  isExpand: false,
                  sex: '男',
                  address: '北京市朝阳区',
                  date: '2022-01-03',
                  children: []
                },
                {
                  level: 3,
                  id: 512,
                  name: 'a王五12',
                  age: 20,
                  isExpand: false,
                  sex: '男',
                  address: '北京市朝阳区',
                  date: '2022-01-03',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  }

}
</script>

<style lang="less" scoped>
.button{
  width: 100px;
  height: 50px;
  border-radius:25px ;
  background-color: #e76d6d;
  cursor: pointer;
}
</style>>
