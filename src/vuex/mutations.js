// 状态事件的回调函数
const mutations = {
  ADD_NOTE (state) { // 添加笔记到列表里
    const newNote = { // 新建一个对象并初始化属性
      title: 'New Caption',
      text: 'New Note',
      favorite: false
    }
    state.notes.push(newNote) // push 到笔记列表里去
    state.activeNote = newNote // 把新建的这条笔记设为当前笔记
  },

  EDIT_TITLE (state, text) { // 编辑当前笔记标题
    state.activeNote.title = text
  },

  EDIT_NOTE (state, text) { // 编辑当前笔记内容
    state.activeNote.text = text
  },

  DELETE_NOTE (state) { // 删掉当前笔记
    let index = state.notes.indexOf(state.activeNote)
    state.notes.splice(index, 1)
    state.activeNote = state.notes[0] || {}
  },

  TOGGLE_FAVORITE (state) { // 收藏/取消收藏当前笔记
    state.activeNote.favorite = !state.activeNote.favorite
  },

  SET_ACTIVE_NOTE (state, note) { // 把选中的笔记设置为「当前笔记」
    state.activeNote = note
  }
}

export default mutations
