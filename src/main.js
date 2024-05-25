import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.css'
import VConsole from 'vconsole'
Vue.config.productionTip = false
// 判断是否是pc设备
const isPc = () => {
  const userAgentInfo = navigator.userAgent
  const Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod']
  let flag = true
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

// 如果不是生产环境并且不是pc设备那么就显示调试
if (process.env.NODE_ENV !== 'prod' && !isPc()) {
  console.log(process.env.NODE_ENV)
  const vConsole = new VConsole()
  console.log(vConsole)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
