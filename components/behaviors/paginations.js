// 分页
const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    //是否返回结果为空
    noneResult:false,
    loading:false
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
        noneResult: false,
        loading: false
      })
      this.data.total = null
    },


    //是否锁住了
    isLocked() {
      return this.data.loading ? true : false
    },

    //加锁
    locked() {
      //如果wxml中，绑定的有data中的变量的话，改变这个值必须要使用setData来进行，如果没有绑定的话，则可以直接使用=来赋值
      this.setData({
        loading: true
      })
    },

    //解锁
    unLocked() {
      this.setData({
        loading: false
      })
    },
  }
})

export {
  paginationBev
}