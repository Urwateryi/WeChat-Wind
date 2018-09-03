Component({
  /**
   * 组件的属性列表
   */
  properties: {
      index:{
        type:String,
        //当我们改变了index的值的时候，微信小程序会主动地来调用该方法，newVal代表改变之前的数值，oldVal代表改变之后的数值
        observer(newVal,oldVal,changedPath){
            let val = newVal < 10 ? '0' + newVal : newVal
            this.setData({
              _index:val
            })
        }
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months:[
      '一月','二月','三月','四月','五月','六月','八月','九月','十月','十一月','十二月'
    ],
    year: 0,
    month: "",
    _index:""
  },

  attached(){
    const date=new Date()
    const year =date.getFullYear()
    const m=date.getMonth()

    this.setData({
      // year:year,可以使用eslint直接改写成以下写法
      year,
      month: this.data.months[m]
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
