import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'

let classicModel = new ClassicModel();
let likeModel = new LikeModel();

Page({

  data: {
    classicData: null,
    latest: true,
    first: false,
    likeCount:0,
    likeStatus:false
  },

  onLoad(options) {
    classicModel.getLastest((res) => {
      console.log(res)
      this.setData({
        // classicData是要传递到wxml中去，被wxml使用的变量，最好在data中初始化一下
        classicData: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  //点赞
  onLike(event) {
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type);
  },

  //上一条
  onPrevious(event) {
    this._updataClassic('previous')
  },

  //下一条
  onNext(event) {
    this._updataClassic('next')
  },

  _updataClassic(nextOrPrevious) {
    const index=this.data.classicData.index

    classicModel.getClassic(index, nextOrPrevious, (res) => {
      console.log(res)

      this._getLikeStatus(res.id,res.type)
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  _getLikeStatus(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (res) => {
        this.setData({
          likeCount:res.fav_nums,
          likeStatus:res.like_status
        })
    })
  }
})