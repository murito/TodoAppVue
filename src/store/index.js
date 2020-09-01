import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todoList: [
            {
                id: 0,
                text: 'Task One',
                state: 0
            },
            {
                id: 1,
                text: 'Task Two',
                state: 0
            },
            {
                id: 2,
                text: 'Hack NASA',
                state: 1
            },
            {
                id: 3,
                text: 'Task Three',
                state: 0
            },
        ]
    },

    mutations: {
        addTask(state, payload){
            state.todoList.push(payload);
        },

        removeTask(state, payload){
            let index = state.todoList.findIndex(t => t.id == payload.id);
            if( index != -1 ){
                state.todoList.splice(index, 1);
            }
        },

        updateTask(state, payload){
            let index = state.todoList.findIndex(t => t.id == payload.id);
            if( index != -1 ){
                Vue.set(state.todoList, index, payload.update);
            }
        },

        setTasks(state, payload){
            Vue.set(state, 'todoList', payload);
        }
    },

    actions: {
    },

    modules: {
    }
})
