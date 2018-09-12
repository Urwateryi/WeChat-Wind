import {
  HTTP
} from '../util/http-p.js'

class KeywordModel extends HTTP{

  key = 'q'
  maxLength = 10

  //从缓存中取出历史搜索记录
  getHistory() {
    const words = wx.getStorageSync(this.key)
    if (!words) {
      return []
    }
    return words
  }

  //将搜索内容存放到缓存中
  addToHistory(keyword) {
    let words = this.getHistory()
    //先判断历史记录中是否有该关键词
    const has = words.includes(keyword)
    if (!has) {
      //先判断数组的大小，如果超过了最大值，则需要先删除数组末尾的数据，在把keyword添加到数组的第一位
      const length = words.length
      if (length >= this.maxLength) {
        words.pop() //删除末尾的元素
      }
      //将keyword放到words数组中的第一位
      words.unshift(keyword)
      //如果key相同，则会覆盖之前的缓存
      wx.setStorageSync(this.key, words)
    }
  }

  //从网络获取热门搜索
  getHot() {
    return this.request({
      url: 'book/hot_keyword'
    })
  }
}

export {
  KeywordModel
}