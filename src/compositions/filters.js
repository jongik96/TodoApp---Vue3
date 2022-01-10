import { inject } from "vue";

export const useFilter = () => {
  const today = inject("today");

  //  날짜 순 내림차순 정렬
  const fnSort = (a, b) => {
    console.log("필터 : 날짜순으로 정렬");
    const a_date = Date.parse(a.date);
    const b_date = Date.parse(b.date);
    if (a_date > b_date) return 1;
    else if (a_date < b_date) return 0;
    else return a.id - b.id;
  };

  // 오늘 해야 할 작업
  const getPendingTodos = (todos) => {
    console.log("필터 : 오늘 해야 할 작업");
    return todos.value
      .filter((todo) => todo.date < today && !todo.completed)
      .slice()
      .sort(fnSort);
  };

  // 해야 할 작업
  const getActiveTodayTodos = (todos) => {
    console.log("필터 : 해야 할 작업");
    return todos.value
      .filter((todo) => todo.date == today && !todo.completed)
      .slice()
      .sort(fnSort);
  };

  // 완료한 작업
  const getCompletedTodayTodos = (todos) => {
    console.log("필터 : 완료한 작업");
    return todos.value
      .filter((todo) => todo.date == today && todo.completed)
      .slice()
      .sort(fnSort);
  };

  // 오늘의 모든 기록
  const getAllTodayTodos = (todos) => {
    console.log("필터 : 오늘의 모든 기록");
    return getActiveTodayTodos(todos).concat(getCompletedTodayTodos(todos)).slice().sort(fnSort);
  };

  // 모든 날을 아우르는 상태와 상관없는 작업
  const getAllTodos = (todos) => {
    console.log("필터 : 모든 작업");
    return todos.value.slice().sort(fnSort);
  };

  return {
    getPendingTodos,
    getActiveTodayTodos,
    getCompletedTodayTodos,
    getAllTodayTodos,
    getAllTodos,
  };
};
