import {
  KeywordModel
} from '../../models/keywords.js'
import {
  BookModel
} from '../../models/book.js'

import {
  paginationBev
} from '../behaviors/paginations.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  behaviors: [
    paginationBev
  ],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      //当该值发生变化的时候，才会触发该事件，所以more使用随机数，使每次的值不一样
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //历史搜索
    historyWords: [],
    //热门搜索
    hotKeyword: [],
    //控制标签页和搜索结果页的显示与隐藏
    searching: false,
    q: '', //输入框中的内容
    loading: false, //是否正在发送请求
    loadingCenter: false
  },

  attached() {
    //获取历史搜索词
    this._getHistoryWords()

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
    //加载更多
    loadMore() {
      if (!this.data.q) {
        return
      }
      //相当于加了一个锁，如果正在加载，那么就不要再去请求数据了
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books)
            this.unLocked()
          }, () => {
            //失败，比如断网的时候，也需要解锁
            this.unLocked()
          })
      }
    },

    //执行搜索
    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      //前者为点击tag获取到的内容，后者为在input组件内部获取到的内容
      const q = event.detail.text || event.detail.value
      this.setData({
        q //搜索成功后，将搜索的内容赋值到输入框中，特别是点击标签搜索功能
      })
      bookModel.search(0, q)
        .then(res => {
          this.setMoreData(res.books)
          this.setTotal(res.total)

          //搜索的记录，添加到缓存中
          keywordModel.addToHistory(q)
          this._hideLoadingCenter()
        })
    },

    //关闭搜索结果页
    onCancel(event) {
      //清空之前的数据
      this.initalize()
      this.triggerEvent('cancel', {}, {})
    },

    //删除文本框中的内容
    onDelete(event) {
      this._getHistoryWords()
      //清空之前的数据
      this.initalize()
      this._closeResult()
    },

    //显示搜索结果页
    _showResult() {
      this.setData({
        searching: true
      })
    },

    //关闭搜索结果页
    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    },

    //获取历史搜索记录
    _getHistoryWords() {
      this.setData({
        historyWords: keywordModel.getHistory()
      })
    },

    //显示加载圈
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    //隐藏加载圈
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    }
  }
})