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
        <div class="c-pointer button">按钮</div>
        <template #content>
          <ul>
            <li v-for="(item,index) in tipList" :key="index">{{item.title}}</li>

          </ul>
        </template>
      </TipRisght>
      </div>

    </CardItem>
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
  methods: {
    showTooltip () {
      console.log('移入了')
      this.visible = true
    },
    hideTooltip () {
      console.log('移出了')

      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.tips{
  height: 40px;
  background-color: #FD742D;
  text-align: center;
  color: #fff;
  line-height: 40px;
}
</style>>
