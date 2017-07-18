import Vue from 'vue'
import marked from 'marked'
import Cache from './cache'
import utils from './utils'

const cache = new Cache()
let AUTO_SAVE_TIMER = 0
let MARKED_RENDER_TIMER = 0

// 状态事件的回调函数
const mutations = {
  ADD_NOTE (state) { // 添加笔记到列表里
    let $lf = state.$lf
    let $lfConfig = state.$lfConfig
    let now = Date.now()
    const newNote = { // 新建一个对象并初始化属性
      id: ++$lfConfig[$lfConfig.ID_KEY] + '',
      title: '',
      text: '',
      favorite: false,
      createtime: now,
      updatetime: now,
      renderHtml: ''
    }
    state.notes.push(newNote) // push 到笔记列表里去
    state.activeNote = newNote // 把新建的这条笔记设为当前笔记

    $lf.setItem($lfConfig.ID_KEY, $lfConfig[$lfConfig.ID_KEY]).then(function (value) {
      console.log('SAVE_ID_KEY', value)
    }).catch(function (err) {
      console.log(err)
    }).then(function () {
      mutations.SAVE_NOTE(state)
      mutations.RENDER_NOTE(state)
    })
  },

  EDIT_TITLE (state, text) { // 编辑当前笔记标题
    state.activeNote.title = text
  },

  EDIT_NOTE (state, text) { // 编辑当前笔记内容
    state.activeNote.text = text
    clearTimeout(MARKED_RENDER_TIMER)
    MARKED_RENDER_TIMER = setTimeout(mutations.RENDER_NOTE, 500, state)
  },

  RENDER_NOTE (state) { // 渲染笔记
    Vue.set(state.activeNote, 'renderHtml', marked(state.activeNote.text || ''))
  },

  SAVE_NOTE (state) { // 保存当前笔记
    clearTimeout(AUTO_SAVE_TIMER)
    let autoSave = state.$lfConfig.autoSave
    let note = utils.omit(state.activeNote, 'renderHtml')
    if (note.id && cache.haveChange(note)) { // 当前编辑笔记及笔记内容发生改变时
      note.updatetime = Date.now()
      state.$lf.setItem(note.id, note).then(function (value) {
        console.log('SAVE_NOTE')
        cache.set(note)
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

  LOAD_NOTES (state) { // 加载所有笔记
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
    let note = state.notes.splice(index, 1)[0]
    state.$lf.removeItem(note.id).then(function () {
      console.log('DELETE_NOTE')
    }).catch(function (err) {
      console.log(err)
    })
    note.isdelete = true
    state.activeNote = state.notes[Math.max(0, index - 1)] || {}
  },

  TOGGLE_FAVORITE (state) { // 收藏/取消收藏当前笔记
    state.activeNote.favorite = !state.activeNote.favorite
    mutations.SAVE_NOTE(state)
  },

  TOGGLE_NOTESLIST (state) {
    state.showNotesList = !state.showNotesList
  },

  SET_ACTIVE_NOTE (state, note) { // 把选中的笔记设置为「当前笔记」
    mutations.SAVE_NOTE(state) // 先保存后切换
    cache.set(note) // 缓存当前编辑的笔记
    state.activeNote = note
    mutations.RENDER_NOTE(state) // 然后渲染
  }
}

export default mutations
