import { reactive, toRefs } from "vue";

export const useStorage = () => {
  const KEY = "my-todo-list"; // localStorage 에서 데이터를 저장할 KEY
  const storage_obj = reactive({ storage_id: 0 }); // 일정 리스트를 가질 todos 속성과 신규 id를 책정할 수 있는 storage_id 속성을 가진 객체

  // localStorage 는 데이터를 UTF-15 DOMString 형식으로 저장하기 때문에 배열 형식의 값을 그냥 저장할 수 없다.
  // 따라서 JOSN의 stringify를 이용해 값을 문자열 형식으로 변환해 저장하고,
  // 불러올 때도 문자열 형식으로 불러온 값을 JSON.parse 를 이용해 객체로 변환해야한다.

  // localStorage 로부터 데이터를 불러오는 함수
  const loadTodos = (initTodos) => {
    // localStorage에 저장된 값을 불러와서 temp_todos 에 먼저 삽입한다
    // 인덱스 역할을 하는 id 를 다시 부여하는 것과 storage_id 에 배열의 길이를 저장하기 위해
    let temp_todos = JSON.parse(localStorage.getItem(KEY) || "[]");
    temp_todos.forEach((todo, idx) => {
      todo.id = idx;
    });
    storage_obj.storage_id = temp_todos.length;
    initTodos(temp_todos);
  };

  // localStorage 로 데이터를 저장하는 함수
  const saveTodos = (todos) => {
    localStorage.setItem(KEY, JSON.stringify(todos.value));
  };
  return {
    ...toRefs(storage_obj),
    loadTodos,
    saveTodos,
  };
};
