// 状态事件的回调函数
const getters = {
  notes: state => state.notes,
  activeNote: state => state.activeNote,
  showNotesList: state => state.showNotesList
}

export default getters
