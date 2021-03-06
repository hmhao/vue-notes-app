import Vue from 'vue'
import Vuex from 'vuex'
import localforage from 'localforage'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const ID_KEY = '@@idkey@@'
const lf = localforage
const lfConfig = {
  name: 'vue-notes-app',
  storeName: 'notes',
  ID_KEY,
  [ID_KEY]: 0,
  autoSave: {
    interval: 10000 // 10秒
  }
}
lf.config(lfConfig)

// 状态对象会包含所有应用级别的状态，也就是各个组件需要共享的状态。
const state = {
  $lf: lf, // 离线数据库
  $lfConfig: lfConfig, // 离线数据库配置
  notes: [], // 笔记列表包含了 NodesList 组件要渲染的 notes 对象
  activeNote: {}, // 当前笔记则包含当前选中的笔记对象，多个组件都需要这个对象
  showNotesList: true
}

mutations.LOAD_NOTES(state) // 加载笔记

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
