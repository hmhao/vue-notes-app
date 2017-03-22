// 组件内部用来分发 mutations 事件
// 它们接收 store 作为第一个参数，这里是es6的析构
const actions = {
  addNote: ({ commit }) => commit('ADD_NOTE'),
  editNote: ({ commit }, e) => {
    commit('EDIT_NOTE', e.target.value)
  },
  deleteNote: ({ commit }) => {
    commit('DELETE_NOTE')
  },
  updateActiveNote: ({ commit }, note) => commit('SET_ACTIVE_NOTE', note),
  toggleFavorite: ({ commit }) => {
    commit('TOGGLE_FAVORITE')
  }
}

export default actions
