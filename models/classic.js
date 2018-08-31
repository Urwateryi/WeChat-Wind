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

        //写入缓存
        let key=this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }

  getClassic(index,nextOrPrevious, sCallback) {
    let key=nextOrPrevious=='next'?this._getKey(index+1):this._getKey(index-1)
    //从缓存中找
    let classicCache=wx.getStorageSync(key)
    //如果没找到
    if (!classicCache){
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          //写入缓存
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    }else{
      //如果找到了，直接就用缓存的
      sCallback(classicCache)
    }
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

  _getKey(index){
    let key='classic-'+index
    return key
  }
}

export {
  ClassicModel
}