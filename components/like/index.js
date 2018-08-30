Component({
  /**
   * 组件的属性列表，即会开放出去的属性
   */
  properties: {
    like:{
      // 目前小程序只可以设置以下三个值，其中type为必填，value和observer为选填
      type:Boolean,
      // 初始值，如果初始值为false的话，没有必要写，因为boolean的默认值本来就是false，所以当初始值要为true时，才有必要写
      value:false,
      // 监听方法
      observer:function(){

      },
      count:{
        type:Number,
      }
    }
  },

  /**
   * 组件内部的数据定义在此，即内部的私有属性
   */
  data: {
    // 数据绑定
    like:false,
    count:99,
    likeSrc:"images/like.png",
    unLikeSrc:'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(event){
      
    }
  }
})
