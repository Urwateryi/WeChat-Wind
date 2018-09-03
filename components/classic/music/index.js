import { classicBehavior } from '../classic-behavior.js'

//音乐管理对象
const mMgr=wx.getBackgroundAudioManager()

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
    playing:false,
    pauseSrc:'images/player@pause.png',
    playSrc:'images/player@play.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(event){
      //修改播放按钮的图片及状态
      this.setData({
        playing: !this.data.playing
      })
      //给一个播放音乐的src
      if(!this.data.playing){
        mMgr.pause()
      }else{
        mMgr.src = this.properties.src
      }
    }
  }
})
