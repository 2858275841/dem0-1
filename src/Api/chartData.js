// 图表信息数据api
import request from '@/utils/request'

export const getChartData = function() {
  return request.get('/tuBiao/Get')
}
