<template>
  <div id="notes-list">
    <div id="list-header">
      <h2>笔记</h2>
      <div class="btn-group btn-group-justified" role="group">
        <div class="btn-group" role="group"
          v-for="type in types">
          <button type="button" class="btn btn-default"
            @click="show = type.key"
            :class="{active: show === type.key}">
            {{type.label}}
          </button>
        </div>
      </div>
    </div>
    <!-- render notes in a list -->
    <div class="container">
      <div class="list-group">
        <a v-for="note in filteredNotes"
          class="list-group-item" href="javascript:void(0)"
          @click="updateActiveNote(note)">
          <h4 class="list-group-item-heading">
            <i class="glyphicon glyphicon-list-alt"></i>
            {{(note.title || '无标题') | truncate(35)}}
          </h4>
          <span>{{note.createtime | date('yyyy/M/d')}}</span>
          <p>{{note.text | truncate(70)}}</p>
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
      show: 'all',
      types: [{
        label: '全部',
        key: 'all' // All Notes button
      }, {
        label: '标星',
        key: 'favorites' // Favorites Button
      }]
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
  methods: mapActions(['updateActiveNote'])
}
</script>
