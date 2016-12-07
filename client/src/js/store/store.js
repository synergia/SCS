const Vue = require('vue');
const Vuex = require('vuex');

Vue.use(Vuex);

module.exports = new Vuex.Store({
    state: {
        todos: [],
        newTodo: '',
        config: '',
        showSidebar: false,
    },
    mutations: {
        SET_CONFIG(state, config){
            state.config = config;
        },
        SHOW_SIDEBAR(state){
            state.showSidebar = !state.showSidebar;
        },
        GET_TODO(state, todo){
            state.newTodo =  todo;
        },
        ADD_TODO(state){
            state.todos.push({
                body: state.newTodo,
                completed: false
            });
        },
        EDIT_TODO(state, todo){
            var todos = state.todos;
            todos.splice(todos.indexOf(todo), 1);
            state.todos = todos;
            state.newTodo = todo.body;
        },
        REMOVE_TODO(state, todo){
            var todos = state.todos;
            todos.splice(todos.indexOf(todo), 1);

        },
        COMPLETE_TODO(state, todo){
            todo.completed = !todo.completed;
        },
        CLEAR_TODO(state){
            state.newTodo = '';
        }
    },
    actions: {
        setConfig({commit}, config){
            commit('SET_CONFIG', config);
        },
        showSidebar({commit}){
            commit('SHOW_SIDEBAR');
        },
        getTodo({commit}, todo){
            commit('GET_TODO', todo);
        },
        addTodo({commit}){
            commit('ADD_TODO');
        },
        editTodo({commit}, todo){
            commit('EDIT_TODO', todo);
        },
        removeTodo({commit}, todo){
            commit('REMOVE_TODO', todo);
        },
        completeTodo({commit}, todo){
            commit('COMPLETE_TODO', todo);
        },
        clearTodo({commit}){
            commit('CLEAR_TODO');
        }

    },
    getters: {
        showSidebar: state => state.showSidebar,
        newTodo: state => state.newTodo,
        todos: state => state.todos.filter((todo) => {return !todo.completed;}),
        completedTodos: state => state.todos.filter((todo) => {return todo.completed;})
    }

});
