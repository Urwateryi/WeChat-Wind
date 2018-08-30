import {HTTP} from '../util/http.js'

class ClassicModel extends HTTP{
  getLastest(sCallback){
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
      }
    })
  }
}

export{
  ClassicModel
}