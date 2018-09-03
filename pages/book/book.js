import {
  BookModel
} from '../../models/book.js'

const bookModel = new BookModel()

Page({

  data: {

  },

  onLoad(options) {
    const hotList = bookModel.getHotList()
    hotList.then(res => console.log(res))
  },
})