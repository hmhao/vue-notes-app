<template>
  <div class="note-timeline-mask timeline">
    <dl>
      <template v-for="(group, date) in notesGroup">
        <dt >{{date}}</dt>
        <dd v-for="note in group">
          <span class="circ"></span>
          <span class="time">{{note.updatetime | date('shortTime')}}</span>
          <button class="title" @click="updateActiveNote(note)">{{note.title}}</button>
        </dd>
      </template>
    </dl>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['notes']),
    notesGroup () {
      let group = {}
      let dateFilter = Vue.filter('date')
      let mediumDate
      this.notes.forEach(function (note) {
        mediumDate = dateFilter(note.updatetime, 'yyyy/MM/dd')
        if (!group[mediumDate]) {
          group[mediumDate] = []
        }
        group[mediumDate].push(note)
      })
      return group
    }
  },
  // 映射 this.updateActiveNote() 为 this.$store.dispatch('SET_ACTIVE_NOTE')
  methods: mapActions(['updateActiveNote'])
}
</script>
