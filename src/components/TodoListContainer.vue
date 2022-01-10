<template>
    <todo-list-new />
    <section class="container">
        <div class="row justify-content-center m-2">
            <todo-list-main/>
        </div>
    </section>
</template>

<script>
import { ref, readonly, provide } from 'vue'
import { useStorage } from '../compositions/storage'
import TodoListNew from './TodoListNew.vue'
import TodoListMain from './TodoListMain.vue'
export default {
    name : 'TodoListContainer',
    setup() {
        const todos = ref([]);
        const { loadTodos, saveTodos, storage_id } = useStorage();

        provide('todos', readonly(todos))

        // 처음 todos 의 값을 채워줄 초기화 함수
        const initTodos = (init_todos) => {
            todos.value = init_todos
        }

        // todos 변수에 새로운 할 일을 더하는 함수
        const addTodo = (job, date) => {
            todos.value.push({
                id: storage_id.value++,
                job: job,
                date: date,
                completed: false,
            })
            saveTodos(todos)
        }

        // 특정 id의 객체를 todos 배열에서 제거하는 함수
        const removeTodo = (id) => {
            todos.value.splice(id, 1)
            todos.value.forEach((todo, idx) => {
                todo.id = idx
            })
            saveTodos(todos)
        }

        // 객체의 completed 속성을 true 로 변경하는 함수
        const completeTodo = (id) => {
            todos.value.find((todo) => todo.id == id).completed = true
            saveTodos(todos)
        }

        provide('addTodo', addTodo)
        provide('removeTodo', removeTodo)
        provide('completeTodo',completeTodo)

        loadTodos(initTodos)
    },
    components: {
        TodoListNew,
        TodoListMain
    }
    
}
</script>
 
<style>

</style>