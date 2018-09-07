import {
  BookModel
} from '../../models/book.js'
import{
  LikeModel
}from '../../models/like.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()

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

  onLike(event){
    const list_or_cancel = event.detail.behavior
    likeModel.like(list_or_cancel, this.data.book.id, 400);
  }
})