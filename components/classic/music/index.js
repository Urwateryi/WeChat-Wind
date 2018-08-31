import { classicBehavior } from '../classic-behavior.js'
Component({

  behaviors: [
    classicBehavior
  ],
  /**
   * 组件的属性列表
   */
  properties: {
    src:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc:'images/player@pause.png',
    playSrc:'images/player@play.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
