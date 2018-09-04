import {
  HTTP
} from '../util/http-p.js'

class BookModel extends HTTP {
  //获取热门书籍列表
  getHotList() {
    return this.request({
      url:'book/hot_list'
    })
  }

  getMyBookCount(){
    return this.request({
      url: '/book/favor/count'
    })
  }

  //获取书籍的详情
  getDetail(bid){
    return this.request({
      url:`book/${bid}/detail`
    })
  }

  //获取当前图书的点赞状态
  getLikeStatus(bid){
    return this.request({
      url:`/book/${bid}/favor`
    })
  }

  //获取当前图书的短评信息
  getComments(bid){
    return this.request({
      url:`book/${bid}/short_comment`
    })
  }
}

export {
  BookModel
}