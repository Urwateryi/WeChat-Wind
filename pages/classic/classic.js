import {
  ClassicModel
} from '../../models/classic.js'

let classic = new ClassicModel();

Page({

  data: {
    classicData: null
  },
  onLoad(options) {
    classic.getLastest((res) => {
      console.log(res)
      this.setData({
        // classicData是要传递到wxml中去，被wxml使用的变量，最好在data中初始化一下
        classicData: res
      })
    })
  },

  onLike(event) {

  }
})