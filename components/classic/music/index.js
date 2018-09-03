import {
  classicBehavior
} from '../classic-behavior.js'

//音乐管理对象
const mMgr = wx.getBackgroundAudioManager()

Component({

  behaviors: [
    classicBehavior
  ],
  /**
   * 组件的属性列表
   */
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },

  attached() {
    this._recoverStatus()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(event) {
      //修改播放按钮的图片及状态
      this.setData({
        playing: !this.data.playing
      })
      //给一个播放音乐的src
      if (!this.data.playing) {
        mMgr.pause()
      } else {
        mMgr.src = this.properties.src
      }
    },

    //每次切换都检测一遍，如果当前后台没有音乐播放，则显示为暂停状态
    _recoverStatus() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }

      //如果当前正在播放的背景音乐和该组件的背景音乐地址一致，则就显示为播放状态
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    }
  }
})