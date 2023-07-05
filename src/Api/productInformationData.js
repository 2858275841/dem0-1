// 手机信息数据api
import request from '@/utils/request'

export const getproductInformationData = function() {
  return request.get('/cellphone/model')
}
