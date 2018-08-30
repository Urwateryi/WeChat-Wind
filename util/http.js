// 这里的config必须和导出地方的源常量名一致，如果不想用原来的名字，则可以使用import{config as 别名} from '/config.js'
import {
  config
} from '../config.js'

const tips={
  1:'抱歉！出现了一个错误',
  1005:'appkey无效，请前往www.7yue.pro申请',
  3000:'期刊不存在'
}

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
            params.success(res.data)
        }else{//异常，
          this._show_error(res.data.error_code)
        }
      },
      fail:(err)=>{//服务器调用失败
        this._show_error(1)
      }
    })
  }

  _show_error(error_code){
    if(!error_code){
      error_code=1
    }
    wx.showToast({
      title: tips[error_code],
      icon:'none',
      duration:2000
    })
  }
}

export{
  HTTP
}