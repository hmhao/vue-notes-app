<template>
  <div id="note-tab">
    <div class="tab-header">
      <ul class="nav nav-tabs" style="height: 42px;">
        <li v-for="(tab, index) in tabs" :class="{active: active == index}">
          <a @click="active = index" href="javascript:void(0)" :title="tab.title">
            {{tab.title | truncate(5)}}
            <a v-if="index > 0" @click.stop="close(tab)" href="javascript:void(0)">
              <i class="glyphicon glyphicon-remove"></i>
            </a>
          </a>
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <div v-for="(tab, index) in tabs"
          :class="[active == index ? 'in active' : '']"
          class="tab-pane fade">
        <editor v-if="index > 0" :note="tab"></editor>
        <timeline v-else></timeline>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Timeline from './Timeline.vue'
import Editor from './Editor.vue'

export default {
  data () {
    return {
      tabs: [{
        title: 'Home'
      }],
      active: 0
    }
  },
  computed: {
    ...mapGetters(['activeNote'])
  },
  methods: {
    ...mapActions(['updateActiveNote']),
    add (note) {
      if (note.id) {
        let isadd = true
        this.tabs.forEach((t, i) => {
          if (t.id === note.id) {
            this.active = i
            isadd = false
            return false
          }
        })
        if (isadd) {
          this.active = this.tabs.push(note) - 1
        }
      }
    },
    close (tab) {
      this.tabs.forEach((t, i) => {
        if (t.id === tab.id) {
          this.tabs.splice(i, 1)
          this.active = i - 1
          return false
        }
      })
    }
  },
  watch: {
    active (index, oldIndex) {
      if (this.tabs[index] !== this.activeNote) {
        this.updateActiveNote(index > 0 ? this.tabs[index] : {})
      }
    },
    activeNote (note) {
      this.add(note)
    }
  },
  components: {
    Timeline,
    Editor
  }
}
</script>
