import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

// 状态对象会包含所有应用级别的状态，也就是各个组件需要共享的状态。
const state = {
  notes: [], // 笔记列表包含了 NodesList 组件要渲染的 notes 对象
  activeNote: {} // 当前笔记则包含当前选中的笔记对象，多个组件都需要这个对象
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
