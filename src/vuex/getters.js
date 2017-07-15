// 状态事件的回调函数
const getters = {
  notes: state => state.notes,
  activeNote: state => state.activeNote,
  activeNoteID: state => state.activeNote.id,
  activeNoteTitle: state => state.activeNote.title,
  activeNoteText: state => state.activeNote.text,
  activeNoteRender: state => state.renderHtml,
  showNotesList: state => state.showNotesList
}

export default getters
