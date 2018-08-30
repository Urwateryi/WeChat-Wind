import{HTTP} from '../../util/http.js'

let http=new HTTP();

Page({

  data: {

  },
  onLoad: function (options) {
    http.request({
      url:'classic/latest',
      success:(res)=>{
        console.log(res)
      }
    })
  },
})