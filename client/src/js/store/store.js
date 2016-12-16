const Vue = require('vue');
const Vuex = require('vuex');

Vue.use(Vuex);

module.exports = new Vuex.Store({
    state: {
        todos: [],
        newTodo: '',
        pins: {
            propulsions: [],
            logics: [],
            servos: []
        },
        showSidebar: false,
    },
    mutations: {
        SET_PROPULSIONS(state, propulsions) {
            state.pins.propulsions = propulsions;
        },
        SET_LOGICS(state, logics) {
            state.pins.logics = logics;
        },
        SET_SERVOS(state, servos) {
            state.pins.servos = servos;
        },
        SET_PIN(state, pin, place) {
            state.pins['propulsions'].map(function(pin) {
                // let withRole = config.filter((item) => 'propulsions' in item);
                console.log(pin);
            });
        },
        SHOW_SIDEBAR(state) {
            state.showSidebar = !state.showSidebar;
        },
        GET_TODO(state, todo) {
            state.newTodo = todo;
        },
        ADD_TODO(state) {
            state.todos.push({
                body: state.newTodo,
                completed: false
            });
        },
        EDIT_TODO(state, todo) {
            var todos = state.todos;
            todos.splice(todos.indexOf(todo), 1);
            state.todos = todos;
            state.newTodo = todo.body;
        },
        REMOVE_TODO(state, todo) {
            var todos = state.todos;
            todos.splice(todos.indexOf(todo), 1);

        },
        COMPLETE_TODO(state, todo) {
            todo.completed = !todo.completed;
        },
        CLEAR_TODO(state) {
            state.newTodo = '';
        }
    },
    actions: {
        setPropulsions({
            commit
        }, propulsions) {
            commit('SET_PROPULSIONS', propulsions);
        },
        setPin({
            commit
        }, pin) {
            commit('SET_PIN', pin);
            console.log('setpin');
        },
        setLogics({
            commit
        }, logics) {
            commit('SET_LOGICS', logics);
        },
        setServos({
            commit
        }, servos) {
            commit('SET_SERVOS', servos);
        },
        showSidebar({
            commit
        }) {
            commit('SHOW_SIDEBAR');
        },
        getTodo({
            commit
        }, todo) {
            commit('GET_TODO', todo);
        },
        addTodo({
            commit
        }) {
            commit('ADD_TODO');
        },
        editTodo({
            commit
        }, todo) {
            commit('EDIT_TODO', todo);
        },
        removeTodo({
            commit
        }, todo) {
            commit('REMOVE_TODO', todo);
        },
        completeTodo({
            commit
        }, todo) {
            commit('COMPLETE_TODO', todo);
        },
        clearTodo({
            commit
        }) {
            commit('CLEAR_TODO');
        }

    },
    getters: {
        pins: state => state.pins,
        propulsions: state => state.pins.propulsions,
        logics: state => state.pins.logics,
        servos: state => state.pins.servos,
        showSidebar: state => state.showSidebar,
        newTodo: state => state.newTodo,
        todos: state => state.todos.filter((todo) => {
            return !todo.completed;
        }),
        completedTodos: state => state.todos.filter((todo) => {
            return todo.completed;
        })
    }

});
