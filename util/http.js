// 这里的config必须和导出地方的源常量名一致，如果不想用原来的名字，则可以使用import{config as 别名} from '/config.js'
import {
  config
} from '/config.js'

class HTTP {
  request(params) {
    wx.request({
      url: params.url,
      header: params.header,
      method: params.method
    })
  }
}