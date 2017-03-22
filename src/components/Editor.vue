<template>
  <div id="note-editor">
    <input 
      :value="activeNoteTitle"
      @input="editTitle"
      type="text" class="form-control input-title">
    <textarea
      :value="activeNoteText"
      @input="editNote"
      class="form-control">
    </textarea>
    <div class="notes-html"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['activeNoteTitle', 'activeNoteText']),
  // 映射 this.editNote() 为 this.$store.dispatch('EDIT_NOTE')
  methods: mapActions(['editTitle', 'editNote'])
}
</script>
