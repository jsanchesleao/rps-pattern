import Actions from '../actions/todoActions'

export const initialState = {
  todoList: [],
  todoText: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
    case Actions.CHANGE_ADD_TODO_TEXT:
      return {...state, todoText: action.value}
    case Actions.CHANGE_TODOS:
      return {...state, todoList: action.value}
    case Actions.SAVE_TODO:
      return saveTodo(state)
    case Actions.FINISH_TODO:
      return finishTodo(state, action.value)
    case Actions.RESUME_TODO:
      return resumeTodo(state, action.value)
    case Actions.CLEAR_DONE:
      return {...state, todoList: state.todoList.filter(t => t.status !== 'done')}
    default:
      return state
  }
}

const saveTodo = function(state) {
  if (!state.todoText || state.todoText === '') {
    return state
  }
  else {
    return {
      ...state,
      todoList: state.todoList.concat({text: state.todoText, status: 'pending'}),
      todoText: ''
    }
  }
}

const finishTodo = function(state, index) {
  return {
    ...state,
    todoList: state.todoList.map((t, i) => i === index ? {...t, status: 'done'} : t)
  }
}

const resumeTodo = function(state, index) {
  return {
    ...state,
    todoList: state.todoList.map((t, i) => i === index ? {...t, status: 'pending'} : t)
  }
}
