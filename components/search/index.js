import {
  KeywordModel
} from '../../models/keywords.js'
import {
  BookModel
} from '../../models/book.js'

import{
  paginationBev
}from '../behaviors/paginations.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({


  behaviors:[
    paginationBev
  ],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: '_loadMore' //当该值发生变化的时候，才会触发该事件，所以more使用随机数，使每次的值不一样
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
    loading: false //是否正在发送请求
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
    //加载更多
    _loadMore() {
      if (!this.data.q) {
        return
      }
      //相当于加了一个锁，如果正在加载，那么就不要再去请求数据了
      if (this.data.loading) {
        return
      }
      if(this.hasMore()){
        //如果wxml中，绑定的有data中的变量的话，改变这个值必须要使用setData来进行，如果没有绑定的话，则可以直接使用=来赋值
        this.data.loading = true
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books)
            this.data.loading = false
          })
      }
    },

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
      const q = event.detail.text || event.detail.value //前者为点击tag获取到的内容，后者为在input组件内部获取到的内容
      //清空之前的数据
      this.initalize()
      bookModel.search(0, q)
        .then(res => {
          this.setMoreData(res.books)
          this.setTotal(res.total)
          this.setData({
            q //搜索成功后，将搜索的内容赋值到输入框中，特别是点击标签搜索功能
          })
          //搜索的记录，添加到缓存中
          keywordModel.addToHistory(q)
        })
    },

    //删除文本框中的内容
    onDelete(event) {
      //关闭搜索结果页
      this.setData({
        searching: false
      })
    }
  }
})