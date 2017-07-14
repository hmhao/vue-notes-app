<template>
  <div id="note-editor">
    <input 
      :value="activeNoteTitle"
      @input="editTitle"
      @blur="saveNote"
      type="text" class="form-control input-title">
    <textarea
      :value="activeNoteText"
      @input="editNote"
      @blur="saveNote"
      @keydown.ctrl.83.prevent.stop=""
      @keyup.ctrl.83.prevent.stop="saveNote"
      class="form-control">
    </textarea>
    <div id="note-blank-mask" v-if="!activeNoteID"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['activeNoteID', 'activeNoteTitle', 'activeNoteText']),
  // 映射 this.editNote() 为 this.$store.dispatch('EDIT_NOTE')
  methods: mapActions(['editTitle', 'editNote', 'saveNote'])
}
</script>
