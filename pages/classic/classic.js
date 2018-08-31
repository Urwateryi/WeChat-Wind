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

  onLike(event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type);
  },

  //上一条
  onPrevious(event) {
    
  },

  //下一条
  onNext(event) {

  },
})