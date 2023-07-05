import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from '@/staitc/dayjs.min.js'
// import * as echarts from 'echarts'

// import Tab from '@/store/Tab.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false, // 控制左侧的收起与展开

    img_src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', // 用户头像
    time: '', // 时间
    regio: '', // 地区

    tableDate: [],
    // tableDate1: [{
    //   name: 'oppo',
    //   todayBuy: 100,
    //   monthBuy: 300,
    //   totalBuy: 800
    // },
    // {
    //   name: 'vivo',
    //   todayBuy: 100,
    //   monthBuy: 300,
    //   totalBuy: 800
    // },
    // {
    //   name: '小米',
    //   todayBuy: 100,
    //   monthBuy: 300,
    //   totalBuy: 800
    // },
    // {
    //   name: '三星',
    //   todayBuy: 100,
    //   monthBuy: 300,
    //   totalBuy: 800
    // },
    // {
    //   name: '魅族',
    //   todayBuy: 100,
    //   monthBuy: 300,
    //   totalBuy: 800
    // }
    // ],
    tableLabel: {
      name: '课程',
      todayBuy: '今日购买',
      monthBuy: '本月购买',
      totalBuy: '总购买'
    },
    // home订单数据
    countDate: [],
    // 折线图数据
    echarts1Option: {
      series: []
    },
    tabsList: [
      {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      }
    ] // 面包屑
  },
  getters: {},
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    // 获取用户头像
    getImgsrc(state) {
      state.img_src = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    },
    // 获取当前时间
    getTime(state) {
      state.time = dayjs().format('YYYY-MM-DD')
    },
    // 获取当前地区
    getregio(state) {
      state.regio = '江西'
    },
    // 获取手机商品信息数据
    getCommodityInformation(state, res) {
      state.tableDate = res
    },
    // 获取home订单数据信息
    getHomeOrderData(state, res) {
      state.countDate = res
    },
    getqq(state, echarts1Option) {
      state.echarts1Option = echarts1Option
    },
    selectMenu(state, val) {
      if (val.name !== 'home') {
        const index = state.tabsList.findIndex(item => item.name === val.name)
        // console.log(index)
        if (index === -1) {
          state.tabsList.push(val)
          // console.log(val)
        }
      }
    }
  },
  actions: {},
  modules: {}
})
