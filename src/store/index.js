import Vue from 'vue'
import Vuex from 'vuex'
import {getProfile} from '../api/user/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // data
  state: {
    accoutList:[]
  },
  // methods
  mutations: {
  },
  // async methods
  actions: {
    async getAccountListInfo(){
      let res = await getProfile();
      this.accoutList = res
    }
  },
  // computed计算属性
  getters:{

  },
  // 分割代码
  modules: {
  }
})
