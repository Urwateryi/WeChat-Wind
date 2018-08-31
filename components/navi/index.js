Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean, //当前期刊是否是第一期
    latest: Boolean //当前期刊是否是最后一期
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})