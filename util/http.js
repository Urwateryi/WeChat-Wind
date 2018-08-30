// 这里的config必须和导出地方的源常量名一致，如果不想用原来的名字，则可以使用import{config as 别名} from '/config.js'
import {
  config
} from '../config.js'

class HTTP {
  request(params) {
    if(!params.method){
        params.method='GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      data:params.data,
      header:{
        'content-type':'application/json',
        'appkey':config.appkey
      },
      method: params.method,
      success:(res)=>{
        let code=res.statusCode.toString()
        if(code.startsWith('2')){

        }else{

        }
      },
      fail:(err)=>{

      }
    })
  }
}

export{
  HTTP
}