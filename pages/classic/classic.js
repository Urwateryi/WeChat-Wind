import { ClassicModel} from '../../models/classic.js'

let classic = new ClassicModel();

Page({

  data: {

  },
  onLoad: function (options) {
    classic.getLastest((res)=>{
        console.log(res)
    })
  },
})