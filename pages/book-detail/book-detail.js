import {
  BookModel
} from '../../models/book.js'

const bookModel = new BookModel()

Page({

  data: {
    comments:[],
    book:null,
    listStatus:false,
    likeCount:0
  },

  onLoad: function(options) {
    const bid = options.bid

    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    detail.then(res=>{
      this.setData({
        book: res
      })
    })

    comments.then(res=>{
      this.setData({
        comments: res.comments
      })
    })

    likeStatus.then(res => {
      this.setData({
        listStatus: res.like_status,
        likeCount:res.fav_nums
      })
    })
  },
})