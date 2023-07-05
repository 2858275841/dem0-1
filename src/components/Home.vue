<template>
  <div>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="user">
              <img :src="img_src" alt="" class="headPortrait" />
              <div class="user-info">
                <p class="name">Admin</p>
                <p class="access">超级管理员</p>
              </div>
            </div>
            <hr />
            <div class="login-info">
              <p class="lastLoginTime">上次登录时间: <span class="span1">{{ time }}</span></p>
              <p class="lastLoginArea">上次登录地区: <span class="span2">{{ regio }}</span></p>
            </div>
          </el-card>
          <el-card style="margin: 15px 0;">
            <el-table :data="tableDate" style="width: auto" height="500">
              <el-table-column :prop="key" :label="val" width="auto" v-for="(val, key) in tableLabel" :key="val.name" />
              <!-- <el-table-column prop="todayBuy" label="今日购买" width="auto">
              </el-table-column>
              <el-table-column prop="monthBuy" label="本月购买" width="auto">
              </el-table-column>
              <el-table-column prop="totalBuy" label="总购买" width="auto">
              </el-table-column> -->
            </el-table>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16" style="padding-left: 10px;">
        <div class="num">
          <el-card v-for="item in countDate" :key="item.name" :body-style="{ display: 'flex', padding: '0' }">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{ backgroundColor: item.color }"></i>
            <div class="datail">
              <p class="p1">￥{{ item.value }}</p>
              <p class="p2">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 260px; margin-top: 5px;">
          <!-- 折线图 -->
          <div ref="echarts1" style="height: 260px;"></div>
        </el-card>
        <div class="graph" style="margin-top: 15px;">
          <el-card style="height: 260px;">
            <!-- 柱状图 -->
            <div ref="echarts2" style="height: 260px;"></div>
          </el-card>
          <el-card style="height: 260px;">
            <!-- 饼状图 -->
            <div ref="echarts3" style="height: 250px;"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getproductInformationData } from '@/Api/productInformationData.js'
import { getHomeOrderData } from '@/Api/homeOrderData'
import { getChartData } from '@/Api/chartData'
import * as echarts from 'echarts'

export default {
  name: 'Home',
  date() {
    return {

    }
  },
  methods: {
    // vuex 挂载方法
    ...mapMutations(['getTime', 'getregio', 'getImgsrc']),
    alterGetTime() {
      this.getTime()
    },
    alterGetRegio() {
      this.getregio()
    },
    alterGetImgsrc() {
      this.getImgsrc()
    },
    // 初始化商品数据信息
    async initCommodityInformation() {
      const { data: res } = await getproductInformationData()
      this.$store.commit('getCommodityInformation', res)
    },
    // 初始化home订单数据信息
    async initHomeOrderData() {
      const { data: res } = await getHomeOrderData()
      this.$store.commit('getHomeOrderData', res)
    }
  },
  // 生命周期
  created() {
    this.alterGetTime()
    this.alterGetRegio()
    this.alterGetImgsrc()
    this.initCommodityInformation()
    this.initHomeOrderData()
  },
  mounted() {
    // 初始化图表数据
    getChartData().then(data1 => {
      const { data: res } = data1
      const [{ data }] = res
      // 初始化 echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1)
      // 折线图
      const echarts1Option = {}
      const { orderDate, userDate, videoDate } = data
      const { tate, data: data2 } = orderDate
      const xAixs = Object.keys(tate[0])
      const xAixsDate = {
        data: xAixs
      }
      echarts1Option.xAxis = {
        data: data2
      }
      echarts1Option.yAxis = {}
      echarts1Option.legend = xAixsDate
      echarts1Option.series = []
      xAixs.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderDate.tate.map((item) => item[key]),
          type: 'line',
          emphasis: {
            label: {
              show: true
            }
          }
        })
      })
      echarts1.setOption(echarts1Option)
      this.$store.commit('getqq', echarts1Option)
      // 柱状图
      const echarts2 = echarts.init(this.$refs.echarts2)
      const echarts2Option = {
        length: {
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          left: '20%'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: userDate.map(item => item.data),
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLabel: {
            internal: 0,
            color: '#333'
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }
        ],
        color: ['#2ec7c9', '#b6a2de'],
        series: [
          {
            name: '新增用户',
            type: 'bar',
            data: userDate.map(item => item.new)
          },
          {
            name: '活跃用户',
            type: 'bar',
            data: userDate.map(item => item.active)
          }
        ]
      }
      echarts2.setOption(echarts2Option)
      // 饼状图
      // eslint-disable-next-line no-unused-vars
      const echarts3 = echarts.init(this.$refs.echarts3)
      const echarts3Option = {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            data: videoDate
          }
        ]
      }
      echarts3.setOption(echarts3Option)
    })
  },
  // 计算属性
  computed: {
    ...mapState(['time', 'regio', 'img_src', 'tableDate', 'tableLabel', 'countDate'])
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin: 5px 0;
}

.user {
  display: flex;
  align-items: center;

  .headPortrait {
    height: 120px;
    border-radius: 50%;
  }

  .user-info {
    margin: 0 20px;
  }

  .name {
    font-size: 17px;
    font-weight: 600;
  }

  .access {
    color: #999999;
  }
}

.login-info {

  .lastLoginTime,
  .lastLoginArea {
    font-size: 15px;
    color: #999999;
  }

  .span1,
  .span2 {
    font-size: 16px;
    padding: 0 50px;
    color: #777;
  }
}

.num {
  height: 230px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }

  .icon {
    width: 98px;
    height: 98px;
    font-size: 35px;
    line-height: 98px;
    text-align: center;
    color: #fff;
  }

  .datail {
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      margin: 5px;
    }

    .p1 {
      font-size: 20px;
      font-weight: 800px;
    }

    .p2 {
      font-size: 14px;
      color: #999999;
    }
  }
}
.graph{
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>
