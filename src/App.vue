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
import { inject } from 'vue'
import TodoListContainer from './components/TodoListContainer.vue'

export default {
  name: 'app',
  setup() {
    const today = inject('today')
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
