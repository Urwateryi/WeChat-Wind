import {
  BookModel
} from '../../models/book.js'

import{
  random
} from '../../util/common.js'

const bookModel = new BookModel()

Page({

  data: {
    books: [],
    //控制书籍页和搜索标签页的显示与隐藏
    searching: false,
    more: '' //默认情况下不需要加载更多
  },

  onLoad(options) {
    bookModel.getHotList()
      .then(res => {
        this.setData({
          books: res
        })
      })
  },

  onSearching(event) {
    this.setData({
      searching: true
    })
  },

  onCancel(event) {
    this.setData({
      searching: false
    })
  },

  onReachBottom() {
    this.setData({
      more: random(32)
    })
  }
})