import {
  KeywordModel
} from '../../models/keywords.js'

const keywordModel = new KeywordModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotKeyword: []
  },

  attached() {
    //获取历史搜索词
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    //获取热门搜索词
    keywordModel.getHot().then(res => {
      this.setData({
        hotKeyword: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel')
    },

    onConfirm(event) {
      const word = event.detail.value
      keywordModel.addToHistory(word)
    },
  }
})