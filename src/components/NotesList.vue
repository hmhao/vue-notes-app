<template>
  <div id="notes-list">

    <div id="list-header">
      <h2>笔记</h2>
      <div class="btn-group btn-group-justified" role="group">
        <!-- All Notes button -->
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default"
            @click="show = 'all'"
            :class="{active: show === 'all'}">
            全部
          </button>
        </div>
        <!-- Favorites Button -->
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default"
            @click="show = 'favorites'"
            :class="{active: show === 'favorites'}">
            标星
          </button>
        </div>
      </div>
    </div>
    <!-- render notes in a list -->
    <div class="container">
      <div class="list-group">
        <a v-for="note in filteredNotes"
          class="list-group-item" href="#"
          :class="{active: activeNote === note}"
          @click="updateActiveNote(note)">
          <h4 class="list-group-item-heading">
            {{note.title | truncate}}
          </h4>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      show: 'all'
    }
  },
  computed: {
    ...mapGetters(['notes', 'activeNote']),
    filteredNotes () {
      if (this.show === 'all') {
        return this.notes
      } else if (this.show === 'favorites') {
        return this.notes.filter(note => note.favorite)
      }
    }
  },
  // 映射 this.updateActiveNote() 为 this.$store.dispatch('SET_ACTIVE_NOTE')
  methods: mapActions(['updateActiveNote']),
  // 自定义过滤器
  filters: {
    truncate: function (value, maxlen = 20) {
      let v = value.trim()
      if (v.length > maxlen) {
        v = v.substring(0, maxlen) + '...'
      }
      return v
    }
  }
}
</script>
