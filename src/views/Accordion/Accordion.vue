<template>
  <div class="container" >
    <h1 @click="changeData" class="button">accorrdionBox</h1>
    <AccordionBox
    v-if="isShow"
    :accordionList="accordionList"
    @changeItem="changeItem"
    ></AccordionBox>
  </div>
</template>

<script>
import AccordionBox from '@/views/Accordion/AccordionBox.vue'
// import imgurl1 from '@/assets/images/1.jpg'
// import imgurl2 from '@/assets/images/2.jpeg'
// import imgurl3 from '@/assets/images/3.png'
export default {

  name: 'AccordionIndex',
  components: {
    AccordionBox
  },
  data () {
    return {
      isShow: false,
      accordionList: [
        {
          id: 1,
          isActive: false, // 是否默认展开
          title: '第10项',
          imgUrl: require('@/assets/images/1.jpg'),
          content: {
            subTitle: 'Lorem ipsuconsectetur',
            subContent: 'Nulla odit adipisci dicta illo, distinc'

          }
        },
        {
          id: 2,
          isActive: true,
          title: '第20项',
          imgUrl: require('@/assets/images/2.jpeg'),

          content: {
            subTitle: 'bore neque alias laborum ips',
            subContent: 'Nulla odit adipisci dicta illo, distinc'
          }
        },
        {
          id: 3,
          isActive: false,
          title: '第30项',
          imgUrl: require('@/assets/images/3.png'),

          content: {
            subTitle: 'ulla odit adiptur',
            subContent: 'Nuulla odit adip dicta illo, distinc'
          }
        }
      ]
    }
  },
  // mounted () {
  //   this.getimgUrl1()
  // },
  methods: {
  //   async getUrl2 () {
  //     try {
  //       const res1 = await import('@/assets/images/1.jpg')
  //       const res2 = await import('@/assets/images/2.jpeg')
  //       const res3 = await import('@/assets/images/3.png')
  //       this.$set(this.accordionList[0], 'imgUrl', res1.default)
  //       this.$set(this.accordionList[1], 'imgUrl', res2.default)
  //       this.$set(this.accordionList[2], 'imgUrl', res3.default)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   },

    // getimgUrl1 () {
    //   // import('@/assets/images/1.jpg').then((res) => {
    //   //   // console.log(res.default)
    //   //   this.$set(this.accordionList[0], 'imgUrl', res.default)
    //   // })
    //   // const url1 = new URL('../../assets/images/1.jpg', import.meta.url)
    //   // console.log(url1)
    //   this.$set(this.accordionList[0], 'imgUrl', imgurl1)
    //   this.$set(this.accordionList[1], 'imgUrl', imgurl2)
    //   this.$set(this.accordionList[2], 'imgUrl', imgurl3)

    //   // import('@/assets/images/2.jpeg').then((res) => {
    //   //   // console.log(res.default)
    //   //   this.$set(this.accordionList[1], 'imgUrl', res.default)
    //   // })
    //   // import('@/assets/images/3.png').then((res) => {
    //   //   // console.log(res.default)
    //   //   this.$set(this.accordionList[2], 'imgUrl', res.default)
    //   // })
    // },
    changeData () {
      this.isShow = !this.isShow
      // this.accordionList = [
      //   {
      //     id: 1,
      //     isActive: false, // 是否默认展开
      //     title: this.getRandom().toFixed(2),

      //     content: {
      //       subTitle: 'Lorem ipsuconsectetur',
      //       subContent: 'Nulla odit adipisci dicta illo, distinc'
      //     }
      //   },
      //   {
      //     id: 2,
      //     isActive: true,
      //     title: '第20项',

      //     content: {
      //       subTitle: 'bore neque alias laborum ips',
      //       subContent: 'Nulla odit adipisci dicta illo, distinc'
      //     }
      //   },
      //   {
      //     id: 3,
      //     isActive: false,
      //     title: '第30项',

      //     content: {
      //       subTitle: 'ulla odit adiptur',
      //       subContent: 'Nuulla odit adip dicta illo, distinc'
      //     }
      //   }
      // ]
      // this.getimgUrl1()

    // this.getimgUrl1()
    // console.log(this.imgUrl1())
    },
    changeItem (id) {
      this.accordionList.forEach(item => {
        if (item.id === id) {
          this.$set(item, 'isActive', true)
        } else {
          this.$set(item, 'isActive', false)
        }
      })
    },
    getRandom () {
      return Math.random()
    }

  }
}

</script>

<style lang="less" scoped>
.button{
  width: 200px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background-color: #fd742d;
  cursor: pointer;
}
</style>>
