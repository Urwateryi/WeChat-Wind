Component({

  options: {
    //启用插槽
    multipleSlots: true
  },

  //外部样式，接收组件外部传入进来的样式，可以有多个
  externalClasses: [
    'tag-class',
  ],

  /**
   * 组件的属性列表
   */
  properties: {
    text: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      this.triggerEvent('tapping', {
        text: this.properties.text
      })
    }
  }
})