import {
  BookModel
} from '../../models/book.js'

const bookModel = new BookModel()

Page({

  data: {
    books: []
  },

  onLoad(options) {
    bookModel.getHotList()
      .then(res => {
        this.setData({
          books: res
        })
      })
  },
})