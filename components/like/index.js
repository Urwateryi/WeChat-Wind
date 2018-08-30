Component({
  /**
   * 组件的属性列表，即会开放出去的属性
   */
  properties: {
    like: {
      type: Boolean,
    },
    count: {
      type: Number,
    }
  },

  /**
   * 组件内部的数据定义在此，即内部的私有属性
   */
  data: {
    likeSrc: "images/like.png",
    unLikeSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      //如果要取properties或者data中的数据，使用this关键字
      let like = this.properties.like;
      let count = this.properties.count;

      count = like ? count - 1 : count + 1;
      this.setData({
        count : count,
        like: !like
      });

      let behavior=this.properties.like?'like':'cancel'
      this.triggerEvent('like',{
        like:behavior
      })
    }
  }
})