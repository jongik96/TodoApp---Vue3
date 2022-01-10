<template>
  <header>
    <hgroup class="my-5">
      <h1>To Do List</h1>
      <em>{{today}}</em>
    </hgroup>
  </header>
  <todo-list-container/>
</template>

<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { inject } from 'vue'
import TodoListContainer from './components/TodoListContainer.vue'

export default {
  name: 'App',
  setup() {
    const today = inject('today')
    console.log("상단에 오늘 날짜  출력 " + today)
    return { today }
  },
  components: { TodoListContainer },
}
</script>

<style scoped>
hgroup {
  text-align: center;
  font-family: 'Arial Bold';
}

hgroup h1 {
  font-weight: bolder;
}
</style>
