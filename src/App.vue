<template>
  <div id="app">
    <toolbar></toolbar>
    <transition name="notes-list">
      <notes-list v-show="showNotesList"></notes-list>
    </transition>
    <transition name="note-tab">
      <tabs :class="!showNotesList ? 'note-tab-expand' : 'note-tab-collapse'"></tabs>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Toolbar from './components/Toolbar.vue'
import NotesList from './components/NotesList.vue'
import Tabs from './components/Tabs.vue'

export default {
  name: 'app',
  computed: mapGetters(['showNotesList']),
  components: {
    Toolbar,
    NotesList,
    Tabs
  }
}
</script>

<style>

</style>
