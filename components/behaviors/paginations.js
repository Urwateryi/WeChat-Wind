// 分页
const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    //是否返回结果为空
    noneResult:false
  },

  methods: {
    //加载更多
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    //设置数据总数
    setTotal(total) {
      this.data.total = total
      if(total==0){
        this.setData({
          noneResult:true
        })
      }
    },

    //返回当前起始数
    getCurrentStart() {
      return this.data.dataArray.length
    },
    //是否还有更多数据，没有的话，就要禁止网络请求
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },

    //清空数据，初始化数据
    initalize() {
      this.setData({
        dataArray: [],
        noneResult: false
      })
      this.data.total = null
    }
  }
})

export {
  paginationBev
}