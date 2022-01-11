Vue 3 버전을 학습하기 위해서 가장 간단하면서도, 몇 번 만들어 보았던 TodoApp 을 다시 한 번 만들어 보기로 했습니다.

### 목차

1. 결과물 미리보기

2. 학습 내용
	
    2-1. 프로젝트 생성 및 확인
    
    2-2. 필터와 localStorage 저장기능 구현
    
    2-3. 컴포넌트 구현

3. 글을 마치며

---

## TodoApp 결과물

### 구현 기술

- Vue 3 

- Vite 2

- Bootstrap 5

#### 구현한 페이지부터 짧게 살펴보겠습니다.


![](https://images.velog.io/images/pji3504/post/cd7e8d98-691a-4f5a-b080-da0ce57ec88d/ezgif.com-gif-maker.gif)

- 할 일을 추가하면 하단의 '해야 할 작업들' 리스트에 추가됩니다.

![](https://images.velog.io/images/pji3504/post/1e834b6b-4bb6-4a16-afc9-303e2897d077/ezgif.com-gif-maker%20(1).gif)

- 체크박스나 할일관리를 통해 할일 완료 상태로 바꿀 수 있고, 할일 관리를 통해 해당 아이템의 삭제가 가능합니다.

- 필터를 이용해 해야 할 작업, 모든 작업, 완료한 작업, 오늘의 작업 별로 분류해서 볼 수 있습니다.

- 가장 하단의 '미완료작업' 리스트는 할 일을 추가할 때 등록한 날짜가 오늘 날짜보다 과거가 될 경우에 해당 항목이 추가됩니다.


----


## 학습 내용

### 1. Vite2 로 Vue 3 프로젝트 생성하기 (기초 설정)

- vite2 를 통해서 프로젝트를 생성합니다. ( 저는 Vite 2 버전을 이용했으므로 vite 1 버전을 사용하시는 분들과는 차이가 있을 수 있습니다. )

```shell
npm init @vitejs/app '프로젝트명'
	# 다음 나오는 선택사항에서 사용 프레임워크 vue 선택
    # 저는 타입스크립트를 적용하지 않았기에 vue 를 선택했습니다.
cd '프로젝트명'
npm install
```

- Bootstrap 5 설치

```shell
npm install bootstrap@next
# 특정 버전을 정의하지 않으면 최소한 Bootstrap 5 Beta 이상의 버전이 설치됩니다.
#npm install @popperjs/core
```

#### 폴더 구조

- vite2로 vue 프로젝트를 생성하게 되면 아래와 같은 폴더와 파일들이 생성되고 vite.config.js 파일도 자동으로 생성됩니다.

![](https://images.velog.io/images/pji3504/post/1e3bcda2-6afc-4acd-9e03-8ebf4afe54d9/image.png)

- components 폴더 안에 구현할 컴포넌트들을, compositions 폴더에는 모듈들을 생성했습니다.

![](https://images.velog.io/images/pji3504/post/c24b0db9-51c1-4672-a33e-4e48a99f13a8/image.png)

### 2. JavaScript 복습

- compositions 폴더안에는 로컬스토리지 저장을 위한 storage.js 파일과 리스트 필터 기능을 위한 filters.js 파일이 있습니다. 각각의 파일을 살펴보겠습니다.

#### storage.js

- 이번 프로젝트에서는 별도의 서버를 구현하지 않고 webStorage 를 이용해 데이터를 관리하는 방식을 사용했습니다.

```javascript
// 변수에 반응성을 더해주기 위해 import 합니다.
// reactive 는 객체에 반응성을 더해주고 , toRefs 는 객체의 내부 속성들 모두에게 반응성을 더해줍니다.
import { reactive, toRefs } from "vue";

export const useStorage = () => {
  const KEY = "todoItem"; // localStorage 에서 데이터를 저장할 KEY
  const storage_obj = reactive({ storage_id: 0 }); // 리스트를 가질 todos 속성과 신규 id를 확인할 수 있는 storage_id 속성을 가진 객체



  // localStorage 로부터 데이터를 불러오는 함수
  const loadTodos = (initTodos) => {
    // 인덱스 역할을 하는 id 를 다시 부여하는 것과 storage_id 에 배열의 길이를 저장하기 위해
    // localStorage에 저장된 값을 불러와서 temp_todos 에 먼저 삽입한다
    let temp_todos = JSON.parse(localStorage.getItem(KEY) || "[]");
    temp_todos.forEach((todo, idx) => {
      todo.id = idx;
    });

    /* localStorage 는 데이터를 UTF-15 DOMString 형식으로 저장하기 때문에 배열 형식의 값을 그냥 저장할 수 없다.
     따라서 JOSN의 stringify를 이용해 값을 문자열 형식으로 변환해 저장하고,
     불러올 때도 문자열 형식으로 불러온 값을 JSON.parse 를 이용해 객체로 변환해야한다. */

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
```

#### filters.js


- 날짜 순 내림차순 정렬

```javascript
const dateSort = (a, b) => {
    console.log("필터 : 날짜순으로 정렬");
    const a_date = Date.parse(a.date);
    const b_date = Date.parse(b.date);
    if (a_date > b_date) return 1;
    else if (a_date < b_date) return 0;
    else return a.id - b.id;
  };
```

- 날짜가 지났지만 완료 못한 작업

```javascript
const getPendingTodos = (todos) => {
    console.log("필터 : 오늘 해야 할 작업");
    return todos.value
      .filter((todo) => todo.date < today && !todo.completed)
  // 작업의 날짜가 오늘보다 이전일 경우를 걸러냅니다.
      .slice()
      .sort(dateSort); // 위에서 작성한 dateSort 를 이용한다.
  };
```

slice 함수 : 배열에서 필요한 값들만 잘라내 새로운 배열을 생성합니다. 
복사본을 만드는 이유는 원본 데이터가 정렬되지 않은 상태로 놔두기 위해서입니다.
정렬이 되고나면 객체의 id 값이 배열의 인덱스와 달라지기 때문에 나중에 배열에서 데이터를 삭제할 때 id 를 인덱스라고 가정할 수 없게 됩니다.

- 오늘 해야 할 작업

```javascript
const getActiveTodayTodos = (todos) => {
    console.log("필터 : 해야 할 작업");
    return todos.value
      .filter((todo) => todo.date == today && !todo.completed)
  // 작업의 날짜가 오늘과 같을 경우를 걸러냅니다
      .slice()
      .sort(dateSort);
  };
```

- 완료한 작업

```javascript
const getCompletedTodayTodos = (todos) => {
    console.log("필터 : 완료한 작업");
    return todos.value
      .filter((todo) => todo.date == today && todo.completed)
 	// 작업의 날짜가 오늘과 같으며, 상태가 true 값인 작업을 걸러냅니다.
      .slice()
      .sort(dateSort);
  };
```


- 오늘의 모든 기록 ( 추가, 완료 포함 )

```javascript
const getAllTodayTodos = (todos) => {
    console.log("필터 : 오늘의 모든 기록");
    return getActiveTodayTodos(todos)
      .concat(getCompletedTodayTodos(todos))
      .slice().sort(dateSort);
  };
```

- 모든 작업 ( 앞으로의 일정까지 모두 보여주기 )

```javascript
const getAllTodos = (todos) => {
    console.log("필터 : 모든 작업");
    return todos.value.slice().sort(dateSort);
  };
```


### 3. 컴포넌트 구현

컴포넌트의 구조를 그림으로 나타내면 다음과 같습니다.

![](https://images.velog.io/images/pji3504/post/ee3b7e02-daaf-4530-ba2f-6d6b415c6e0f/image.png)

- TodoListContainer 는 TodoApp 의 컴포넌트들을 관리하는 역할입니다.

- TodoListNew 에는 새로운 작업을 추가할 수 있는 UI 를 구현합니다.

- TodoListMain 는 실제 작업 목록을 관리하고 데이터를 TodoList 에 전달해주는 역할을 합니다.

- TodoListMenu 는 작업 목록에 필터를 걸어줄 수 있는 메뉴를 제공합니다.

- TodoList 는 조건에 해당하는 데이터를 보여주는 컴포넌트입니다.


#### TodoListContainer.vue

- template code

```html
<todo-list-new />
<section class="container">
  <div class="row justify-content-center m-2">
    <todo-list-main/>
  </div>
</section>
```

위에서 보여드린 구조와 같이 TodoListNew 컴포넌트와 TodoListMain 컴포넌트로 이루어져 있습니다.

- script code ( setup() 내부 )

```javascript
const todos = ref([]);
	// import 를 통해 useStorage 함수를 가져온 뒤,
	// Storage.js 에서 설정한 기능들을 가져옵니다.
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
		
        // 하위 컴포넌트들에서 해당 함수를 사용할 경우를 위해 provide로 데이터를 전달합니다.
        provide('addTodo', addTodo)
        provide('removeTodo', removeTodo)
        provide('completeTodo',completeTodo)

        loadTodos(initTodos)
```




#### TodoListNew.vue

- template code

```html
// 설명을 위해 div 태그들은 생략했습니다.
<input
       type="text"
       id="todo_input"
       v-model="job"
       placeholder="할 일을 적어주세요"
>
<input
       type="date"
       v-model="date"
       :min="today"
>
<button
        type="button"
        @click="onAddTodo" 
        >
  추가하기
</button>
```

- script code

```javascript
setup() {
  const today = inject('today');  // App.vue 에서 설정해놓은 오늘 날짜
  const addTodo = inject('addTodo');
  const val_obj = reactive({
    job: '',
    date: today,
    today: today,
  })

  const onAddTodo = () => {
    if (val_obj.job.length > 0){
      addTodo(val_obj.job, val_obj.date)
      val_obj.job = '';
      val_obj.date = today;
    }
  }

  return {
    ...toRefs(val_obj),
    onAddTodo,
  }
},
```

#### TodoListMain.vue

- template code

```html
// todoList의 필터링을 설정할 메뉴입니다.
<todo-list-menu v-on:change-filter="onChangeFilter" class="p-0"/>
<div v-for="key in Object.keys(filtered_todos)" :key="key" class="mb-3">
  <div v-if="use_category">
    <em>{{key}}</em>
  </div>
  // 필터링된 작업목록입니다.
  <todo-list :data="filtered_todos[key]" />
</div>

<div class="my-2 mt-5">
  <strong>미 완료 작업</strong>
</div>
// 완료하지 못한 작업입니다.
<todo-list :data="pending_todos"/>
```

- script code ( setup() 내부 )

```javascript
// import 를 통해 useFilter() 기능을 사용합니다.
const  {
  getPendingTodos,
  // ...
} = useFilter()

const filter = ref(0);
const filtered_todos = ref([]);
const pending_todos = ref([]);
const use_category = ref(false);
const todos = inject('todos');

const filters = {
  0: {
    str: '해야 할 작업들',
    func: getActiveTodayTodos,
    category: false,
  },
	// ... 나머지 필터링 메뉴들 생략
}

provide('filters', filters)

// filter 모듈에서 받은 배열을 날짜별로 다시 분리를 한다.
const groupBy = (todos) => {
  return todos.reduce((acc, cur) => {
    acc[cur['date']] = acc[cur['date']] || []
    acc[cur['date']].push(cur);
    return acc;
  }, {})
}

const onChangeFilter = (filter_idx) => {
  filter.value = Number(filter_idx)
}

// 새로운 할 일이 추가되거나, 할 일이 삭제되었을 때를 감시한다.
// 감시 내역을 실시간으로 반영하여 TodoList 컴포넌트에 새로운 데이터를 전달하는 것이 목적
watch(
  [() => filter.value, todos.value],
  ([new_filter, new_todos], [old_filter, old_todos]) => {
    pending_todos.value = getPendingTodos(todos);
    if(typeof new_filter != 'undefined') {
      let temp_todos = filters[new_filter].func(todos)
      filtered_todos.value = groupBy(temp_todos);
      use_category.value = filters[new_filter].category
    }
  },
  { immediate: true }
)

// return 문을 통해 export
```

watch : immediate 속성이 true 로 설정된 것은 TodoListMain 컴포넌트가 생성이 되었을 때 첫 변화도 즉시 감시하여 선언된 함수를 실행하게 하기 위함이다.


#### TodoListMenu

- template code

```html
<button
        type="button"
        data-bs-toggle="dropdown"
        >
  필터를 선택해주세요
</button>
// 필터의 목록
<ul>
  <li v-for="key in Object.keys(filters)" :key="key">
    <a class="dropdown-item" @click="filter = key">{{filters[key].str}}</a>
  </li>
</ul>
```

- script code

```javascript
// watch에서 emit을 사용하기 전에 이벤트 명을 선언해줘야 한다.
emits: ['change-filter'],

setup(props, context) {
  const filters = inject('filters')
  const filter = ref(0)
  
  // filters 객체로 부터 str 속성 값을 뽑아주는 역할
  const state = computed(() =>{
    return filters[filter.value].str
  })
  
  //  선택한 메뉴의 값이 변경될 때마다 해당 키 값을 emit 을 이용해 부모 컴포넌트인 TodoListMain 에 전달한다.
  watch(
    () => filter.value,
    (filter) => {
      context.emit('change-filter', filter)
    }
  )
  
  // return 문을 통해 export
}
```

#### TodoList.vue

- template code

```html
<div v-for="(todo, idx) in data" :key="todo.id">
  // 체크박스로 할 일 완료 시키기
 <input
        type="checkbox"
        :checked="todo.completed" 
        :disabled="todo.completed" 
        @click="completeTodo(todo.id)"
 >
 <ul class="dropdown-menu dropdown-menu-end">
   <li v-for="item in menu" :key="item.str">
     <a class="dropdown-item" @click="item.func(todo.id)">
       {{item.str}}
     </a>
   </li>
 </ul>
 // 리스트메뉴를 통해 할 일 삭제하거나 완료시키기
</div>
```

- script code

```javascript
props: {
  data: {
    type: Array,
      default: [], // 데이터가 들어오지 않을 경우 빈 배열,
  },
},
setup() {
  const removeTodo = inject('removeTodo');
  const completeTodo = inject('completeTodo');
  const today = inject('today');
  const menu = [
    {
      str: '할 일 삭제',
      func: removeTodo,
    },
    {
      str: '할 일 완료',
      func: completeTodo,
    },
  ]
  // return 문을 통해 export
}
```

#### App.vue

- template code

```html
<header>
  <hgroup class="my-5">
    <h1>To Do List</h1>
    <em>{{today}}</em>
  </hgroup>
</header>
<todo-list-container/>
```

- script code

```javascript
setup() {
  // 하위 컴포넌트들에서 사용하게될 today는 main.js 에서 선언한 오늘 날짜이다.
  const today = inject('today')
  console.log("상단에 오늘 날짜  출력 " + today)
  return { today }
},
```

---

### 글을 마치며

Vue 2 에서 Vue 3 로 넘어가면서 기본 개념을 이해하고 익힐 수 있었던 것 같습니다.
다음에는 간단한 블로그 형식의 웹페이지 구현을 계획중입니다.

---

"웹 애플리케이션 개발 기초부터 실전까지 한 권으로 배우는 Vue.js 3" 도서를 참고하며 진행했습니다.

