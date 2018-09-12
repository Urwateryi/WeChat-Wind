import {
  KeywordModel
} from '../../models/keywords.js'
import {
  BookModel
} from '../../models/book.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

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
    //历史搜索
    historyWords: [],
    //热门搜索
    hotKeyword: [],
    //搜索结果
    dataArray: [],
    //控制标签页和搜索结果页的显示与隐藏
    searching: false
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
      //关闭搜索结果页
      this.setData({
        searching: false
      })
    },

    onConfirm(event) {
      //显示搜索结果页
      this.setData({
        searching: true
      })

      //执行搜索
      const q = event.detail.text || event.detail.value//前者为点击tag获取到的内容，后者为在input组件内部获取到的内容
      bookModel.search(0, q)
        .then(res => {
          this.setData({
            dataArray: res.books,
          })
          //搜索的记录，添加到缓存中
          keywordModel.addToHistory(q)
        })
    },

    //删除文本框中的内容
    onDelete(event){
      //关闭搜索结果页
      this.setData({
        searching: false
      })
    }
  }
})