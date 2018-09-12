Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  // attached(){
  //   console.log(this.properties.book)
  // },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      const bid=this.properties.book.id
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`,
      })
    }
  }
})
