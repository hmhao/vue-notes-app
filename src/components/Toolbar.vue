<template>
  <div id="toolbar">
    <i class="logoicon"><img src="/static/img/logo.png"></i>
    <i @click="addNote" class="glyphicon glyphicon-plus"></i>
    <i @click="toggleFavorite"
      class="glyphicon glyphicon-star"
      :class="{starred: activeNote.favorite}"></i>
    <i @click="deleteNote" class="glyphicon glyphicon-remove"></i>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['activeNote']),
  methods: mapActions(['addNote', 'deleteNote', 'toggleFavorite'])
}
</script>
