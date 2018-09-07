import {
  BookModel
} from '../../models/book.js'
import {
  LikeModel
} from '../../models/like.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  data: {
    comments: [],
    book: null,
    listStatus: false,
    likeCount: 0,
    posting: false //用户是否打开了输入框
  },

  onLoad: function(options) {
    const bid = options.bid

    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    detail.then(res => {
      this.setData({
        book: res
      })
    })

    comments.then(res => {
      this.setData({
        comments: res.comments
      })
    })

    likeStatus.then(res => {
      this.setData({
        listStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  },

  onLike(event) {
    const list_or_cancel = event.detail.behavior
    likeModel.like(list_or_cancel, this.data.book.id, 400);
  },

  onFakePost(event) {
    this.setData({
      posting: true
    })
  },

  onCancel(event) {
    this.setData({
      posting: false
    })
  },

  onPost(event) {
    const comment = event.detail.text || event.detail.value //前者为点击tag获取到的内容，后者为在input组件内部获取到的内容

    if (!comment) {
      return
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id, comment)
      .then(res => {
        wx.showToast({
          title: '+ 1',
          icon: 'none'
        })

        //unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度
        this.data.comments.unshift({
          content: comment,
          nums: 1
        })

        this.setData({
          comments: this.data.comments,
          posting: false
        })
      })
  },
})