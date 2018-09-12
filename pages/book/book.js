import {
  BookModel
} from '../../models/book.js'

const bookModel = new BookModel()

Page({

  data: {
    books: [],
    searching: false
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
  }
})