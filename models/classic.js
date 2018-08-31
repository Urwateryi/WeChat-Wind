import {
  HTTP
} from '../util/http.js'

class ClassicModel extends HTTP {
  getLastest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.index)
      }
    })
  }

  getClassic(index,nextOrPrevious, sCallback) {
    this.request({
      url: 'classic/' + index + '/' + nextOrPrevious,
      success: (res) => {
        sCallback(res)
      }
    })
  }

  isFirst(index) {
    return index == 1 ? true : false
  }

  isLatest(index) {
    let latestIndex=this._getLatestIndex()
    return latestIndex==index?true:false
  }

  //将最新一期的index缓存到小程序中
  _setLatestIndex(index) {
    //同步写入缓存
    wx.setStorageSync('latest', index)
  }

  //获取最新一期的index
  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }
}

export {
  ClassicModel
}