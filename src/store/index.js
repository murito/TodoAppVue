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
            state.todoList.splice(payload.id, 1);
        },

        updateTask(state, payload){
            Vue.set(state.todoList, payload.id, payload.update);
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
