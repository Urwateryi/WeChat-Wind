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
    first: false
  },
  onLoad(options) {
    classicModel.getLastest((res) => {
      console.log(res)
      this.setData({
        // classicData是要传递到wxml中去，被wxml使用的变量，最好在data中初始化一下
        classicData: res
      })
    })
  },

  //点赞
  onLike(event) {
    let behavior = event.detail.behavior
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
    classicModel.getClassic(this.data.classicData.index, nextOrPrevious, (res) => {
      console.log(res)
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },
})