<template>
  <div class="container">
    <TableBox :titleList="titleList">
      <TableItem
        :tableData="tableData"
        @seeDetail="handleSeeDetail(...arguments, 1)"
      ></TableItem>
    </TableBox>
    <div @click="changeData" class="button"></div>
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
      originObject: {
        yoyValue: '-123',
        momValue: '234'
      },
      newObj: {
        yoyValue: {
          value: '123',
          isPositiveNumber: '123' > 0
        },
        momValue: {
          value: '234',
          isPositiveNumber: '234' > 0
        }
      },
      dataObject: {
        A081201: {
          indicatorsId: 'FPIDMDEF00083',
          indicatorName: '一般性存款',
          agencyMap: {
            '21TC': {
              agencyId: '21TC',
              agencyName: '嘉定支行',
              next: true,
              values: [
                {
                  value: '123'
                },
                {
                  name: '1'
                }
              ]
            },
            52344: {
              agencyId: '52344',
              agencyName: '上海支行',
              next: true,
              values: [
                {
                  value: '1234'
                },
                {
                  name: '12'
                }
              ]
            },
            52346: {
              agencyId: '52346',
              agencyName: '北京支行',
              next: true,
              values: [
                {
                  value: '12345'
                },
                {
                  name: '125'
                }
              ]
            }
          }
        },
        A081202: {
          indicatorsId: 'FPIDMDEF00083',
          indicatorName: '一般性贷款款',
          agencyMap: {
            '21TC': {
              agencyId: '21TC',
              agencyName: '嘉定支行',
              next: true,
              values: [
                {
                  value: '1238'
                },
                {
                  name: '1'
                }
              ]
            },
            52344: {
              agencyId: '52344',
              agencyName: '上海支行',
              next: true,
              values: [
                {
                  value: '12349'
                },
                {
                  name: '12'
                }
              ]
            },
            52346: {
              agencyId: '52346',
              agencyName: '北京支行',
              next: true,
              values: [
                {
                  value: '123459'
                },
                {
                  name: '1259'
                }
              ]
            }
          }
        },
        A081203: {
          indicatorsId: 'FPIDMDEF00083',
          indicatorName: '一般性贷款款',
          agencyMap: {
            '21TC': {
              agencyId: '21TC',
              agencyName: '嘉定支行',
              next: true,
              values: [
                {
                  value: '123899'
                },
                {
                  name: '1'
                }
              ]
            },
            52344: {
              agencyId: '52344',
              agencyName: '上海支行',
              next: true,
              values: [
                {
                  value: '1234900'
                },
                {
                  name: '12'
                }
              ]
            },
            52346: {
              agencyId: '52346',
              agencyName: '北京支行',
              next: true,
              values: [
                {
                  // value: '12345900'
                },
                {
                  name: '1259'
                }
              ]
            }
          }
        }
      },
      // dataList: [
      //   {
      //     agencyId: '21TC',
      //     agencyName: '嘉定支行',
      //     A081201: '123',
      //     A081202: '1238',
      //     A081203: '123899'
      //   },
      //   {
      //     agencyId: '52344',
      //     agencyName: '上海支行',
      //     A081201: '1234',
      //     A081202: '12349',
      //     A081203: '1234900'
      //   },
      //   {
      //     agencyId: '52346',
      //     agencyName: '北京支行',
      //     A081201: '12345',
      //     A081202: '123459',
      //     A081203: '12345900'
      //   }
      // ],
      detail: 'null',
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
  mounted () {
    console.log(this.transformObject(this.originObject))

    // console.log('detail子传递的', this.detail)
    // const dataList = []
    // const agencyKey = Object.keys(this.dataObject)[0]
    // const agencyIdList = []
    // for (const agencyNum in this.dataObject) {
    //   const agencyNumValue = {
    //     indicatorId: agencyNum,
    //     indicatorName: this.dataObject[agencyNum].indicatorName,
    //     desc: true
    //   }
    //   agencyIdList.push(agencyNumValue)
    // }
    // console.log('agencyIdList', agencyIdList)
    // console.log(agencyKey)
    // console.log(this.dataObject[agencyKey].agencyMap)
    // // 遍历 dataObject
    // for (const agencyId in this.dataObject[agencyKey].agencyMap) {
    //   const agencyData = {
    //     agencyId: this.dataObject[agencyKey].agencyMap[agencyId].agencyId,
    //     agencyName: this.dataObject[agencyKey].agencyMap[agencyId].agencyName
    //   }

    //   // 遍历每个指标
    //   for (const indicatorId in this.dataObject) {
    //     agencyData[indicatorId] = this.dataObject[indicatorId].agencyMap[agencyId].values[0].value || '--'
    //   }

    //   dataList.push(agencyData)
    // }

    // console.log(dataList)
  },
  methods: {
    handleSeeDetail (a, b, c) {
      console.log(a, b, c)
    },
    transformObject (originObject) {
      const newObj = {}

      for (const key in originObject) {
        if (Object.prototype.hasOwnProperty.call(originObject, key)) {
          const value = originObject[key]
          const isPositiveNumber = Number(value) > 0

          newObj[key] = {
            value: value,
            isPositiveNumber: isPositiveNumber
          }
        }
      }

      return newObj
    },
    seeDetail (e, i) {
      console.log('父组件接收table传的数据', e, i)
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
.button {
  width: 100px;
  height: 50px;
  border-radius: 25px;
  background-color: #e76d6d;
  cursor: pointer;
}
</style>>
