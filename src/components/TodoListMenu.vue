<template>
    <div class="row">
        <div class="col">
            <span style="background-color:blue">&nbsp;</span>&nbsp;
            <strong>{{state}}</strong>
        </div>
        <div class="col">
            <div class="btn-group float-end">
                <button
                    class="btn btn-sm rounded dropdown-toggle border border-1 border-dark"
                    type="button"
                    data-bs-toggle="dropdown"
                >
                    필터를 선택해주세요
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li v-for="key in Object.keys(filters)" :key="key">
                        <a class="dropdown-item" @click="filter = key">{{filters[key].str}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch, computed, inject } from 'vue'
export default {
    name: 'TodoListMenu',

    // watch에서 emit을 사용하기 전에 이벤트 명을 선언해줘야 한다.
    emits: ['change-filter'],
    
    setup(props, context) {
        const filters = inject('filters')
        const filter = ref(0)
        const state = computed(() =>{
            return filters[filter.value].str
        })
        watch(
            () => filter.value,
            (filter) => {
                context.emit('change-filter', filter)
            }
        )

        return {
            state, filter, filters,
        }
    }
}
</script>

<style>

</style>