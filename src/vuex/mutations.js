let AUTO_SAVE_TIMER = 0
let cache = {}

// 状态事件的回调函数
const mutations = {
  ADD_NOTE (state) { // 添加笔记到列表里
    let $lf = state.$lf
    let $lfConfig = state.$lfConfig
    const newNote = { // 新建一个对象并初始化属性
      id: ++$lfConfig[$lfConfig.ID_KEY] + '',
      title: 'New Caption',
      text: 'New Note',
      favorite: false
    }
    state.notes.push(newNote) // push 到笔记列表里去
    state.activeNote = newNote // 把新建的这条笔记设为当前笔记

    $lf.setItem($lfConfig.ID_KEY, $lfConfig[$lfConfig.ID_KEY]).then(function (value) {
      console.log('SAVE_ID_KEY', value)
    }).catch(function (err) {
      console.log(err)
    }).then(function () {
      mutations.SAVE_NOTE(state)
    })
  },

  EDIT_TITLE (state, text) { // 编辑当前笔记标题
    state.activeNote.title = text
  },

  EDIT_NOTE (state, text) { // 编辑当前笔记内容
    state.activeNote.text = text
  },

  SAVE_NOTE (state) {
    clearTimeout(AUTO_SAVE_TIMER)
    let autoSave = state.$lfConfig.autoSave
    let note = state.activeNote
    if (note.id && cache[note.id] !== note.text) { // 当前编辑笔记及笔记内容发生改变时
      state.$lf.setItem(note.id, note).then(function (value) {
        console.log('SAVE_NOTE')
        cache[value.id] = value.text
      }).catch(function (err) {
        console.log(err)
      }).then(function () {
        if (AUTO_SAVE_TIMER) {
          AUTO_SAVE_TIMER = setTimeout(mutations.SAVE_NOTE, autoSave.interval, state)
        }
      })
    } else {
      if (AUTO_SAVE_TIMER) {
        AUTO_SAVE_TIMER = setTimeout(mutations.SAVE_NOTE, autoSave.interval, state)
      }
    }
  },

  LOAD_NOTES (state) {
    let $lf = state.$lf
    let $lfConfig = state.$lfConfig
    $lf.iterate(function (value, key, iterationNumber) {
      if (key === $lfConfig.ID_KEY) {
        $lfConfig[$lfConfig.ID_KEY] = value
      } else {
        state.notes.push(value)
      }
    }).then(function () {
      console.log('all notes offline has loaded')
      if ($lfConfig.autoSave) {
        // 设置定时器自动保存
        AUTO_SAVE_TIMER = setTimeout(mutations.SAVE_NOTE, $lfConfig.autoSave.interval, state)
      }
    }).catch(function (err) {
      console.log(err)
    })
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
    mutations.SAVE_NOTE(state) // 先保存后切换
    cache[note.id] = note.text // 缓存当前编辑的笔记内容
    state.activeNote = note
  }
}

export default mutations
