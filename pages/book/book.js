// pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const promise = new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success:(res)=>{
          //信息获取成功后，通过resolve将状态修改为resolve
          resolve(res)
        },
        fail:(error)=> {
          //信息获取失败后，通过resolve将状态修改为reject
          reject(res)
        }
      })
    })

    //then有两个参数，一个是成功，一个是失败，分别对应上面的resolve和reject
    promise.then((res) => {
      console.log(res)
    }, (error) => {
      console.log(error)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})