<template>
  <div id="note-editor">
    <input 
      :value="note.title"
      @input="editTitle"
      @blur="saveNote"
      type="text" class="form-control note-input-title">
    <textarea
      :value="note.text"
      @input="editNote"
      @blur="saveNote"
      @keydown.ctrl.83.prevent.stop=""
      @keyup.ctrl.83.prevent.stop="saveNote"
      class="form-control note-raw-text">
    </textarea>
    <div class="note-render-html" v-html="note.renderHtml"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    note: {
      type: Object,
      required: true,
      default: {
        title: '',
        text: '',
        renderHtml: ''
      }
    }
  },
  // 映射 this.editNote() 为 this.$store.dispatch('EDIT_NOTE')
  methods: mapActions(['editTitle', 'editNote', 'saveNote'])
}
</script>
