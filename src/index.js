import React from "react"
import ReactDOM from "react-dom"
import { combineReducers, createStore } from "redux"
import { Provider, connect } from "react-redux"
import "./index.css"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

const TODO_ADD = "TODO_ADD"
const TODO_TOGGLE = "TODO_TOGGLE"
const FILTER_SET = "FILTER_SET"

const todos = [
  { id: "0", name: "choose auth provider" },
  { id: "1", name: "set up Twilio Vid" }
]

function todoReducer(state = todos, action) {
  switch (action.type) {
    case TODO_ADD: {
      return applyAddTodo(state, action)
    }
    case TODO_TOGGLE: {
      return applyToggleTodo(state, action)
    }
    default:
      return state
  }
}



const wowow = () => {
  return console.log("damn this is amazing shizzle")
}



function applyAddTodo(state, action) {
  const todo = Object.assign({}, action.todo, { completed: false })
  return state.concat(todo)
}

function applyToggleTodo(state, action) {
  return state.map(
    todo =>
      todo.id === action.todo.id
        ? Object.assign({}, todo, { completed: !todo.completed })
        : todo
  )
}

//  FILTER
function filterReducer(state = "SHOW_ALL", action) {
  switch (action.type) {
    case FILTER_SET: {
      return applySetFilter(state, action)
    }
    default:
      return state
  }
}

function applySetFilter(state, action) {
  return action.filter
}

// action creators
function doAddTodo(id, name) {
  return {
    type: TODO_ADD,
    todo: { id, name }
  }
}



function doToggleTodo(id) {
  return {
    type: TODO_TOGGLE,
    todo: { id }
  }
}

function doSetFilter(filter) {
  return {
    type: FILTER_SET,
    filter
  }
}

// store
const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer
})

const store = createStore(rootReducer)

function TodoApp() {
  return <ConnectedTodoList />
}

function TodoList({ todos }) {
  return (
    <div>
      {todos.map(todo => (
        <ConnectedTodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

const lala = () => console.log("wowow baby, that's some hot shit.")

function TodoItem({ todo, onToggleTodo }) {
  lala()
  const { name, id, completed } = todo // pull off the values from the todo object...
  return (
    <div>
      {name}
      <button type="button" onClick={() => onToggleTodo(id)}>
        {completed ? "Unfinished" : "Finished"}
      </button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    todos: state.todoState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleTodo: id => dispatch(doToggleTodo(id))
  }
}

// instead of this we will use below
// const ConnectedTodoApp = connect(mapStateToProps, mapDispatchToProps)(TodoApp)
const ConnectedTodoList = connect(mapStateToProps)(TodoList)
const ConnectedTodoItem = connect(null, mapDispatchToProps)(TodoItem)

ReactDOM.render(
  < Provider store={store} >
    <TodoApp />
  </Provider >,
  document.getElementById("root")
)

registerServiceWorker()
