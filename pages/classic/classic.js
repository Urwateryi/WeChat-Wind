Page({

  data: {

  },
  onLoad: function (options) {
    wx.request({
      url: 'http://bl.7yue.pro/v1/classic/latest',
      header:{
        appkey:"K5H3SiFRY9qLzs0n"
      },
      success:(res)=>{
        
      }
    })
  },
})