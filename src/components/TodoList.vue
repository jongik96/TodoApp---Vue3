<template>
  <main>
      <div v-for="(todo, idx) in data" :key="todo.id">
          <div class="input-group my-2 input-group-sm">
              <div class="input-group-text">
                  <input
                   type="checkbox"
                   class="form-check-input mt-0" 
                   :checked="todo.completed" 
                   :disabled="todo.completed" 
                   @click="completeTodo(todo.id)"
                    >
              </div>
              <div class="input-group-text">
                  <input
                    class="form-input mt-0"
                    type="date"
                    :min="today"
                    disabled
                    :value="todo.date"
                  >
              </div>
              <input
               type="text"
               class="form-control"
               :value="todo.job"
               >
              <button class="btn btn-outline-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
              할 일 관리
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                  <li v-for="item in menu" :key="item.str">
                      {{item.str}}
                  </li>
              </ul>
          </div>
          <div v-show="idx + 1 < data.length" class="col border border-second"/>
      </div>
  </main>
</template>

<script>
export default {

}
</script>

<style>

</style>