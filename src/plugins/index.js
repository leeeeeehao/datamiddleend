import mixin from './hy.mixin.js'
import 'simba-awesome-js'
import filter from './filter.js'

export default{
    install(Vue,options={}){
        Vue.mixin(mixin(options))

        Object.keys(filter).forEach(filterName=>{
          Vue.filter(filterName,filter[filterName]);
        })
    }
}