<template>
  <div id="note-editor">
    <textarea
      :value="activeNoteText"
      @input="editNote"
      class="form-control">
    </textarea>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['activeNoteText']),
  // 映射 this.editNote() 为 this.$store.dispatch('EDIT_NOTE')
  methods: mapActions(['editNote'])
}
</script>

<style>

</style>
