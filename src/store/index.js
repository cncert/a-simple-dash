import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 由于使用单一state状态树，应用的所有状态会集中到一个比较大的对象中。
  // 当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
  // 为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。
  // 每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。
  // 下边的modules是关键字，必须这样写
  modules: {
    app,
    settings,
    user
  },
  getters // 将state的计算属性合并进来
})

export default store
