import {go, put, take, alts} from 'js-csp'
import Actions from '../actions/todoActions'

export default (store, chans) => {
  
  //change the todo input text
  go(function* () {
    while(true) {
      const value = yield take(chans.onChangeTodoText)
      const action = {type: Actions.CHANGE_ADD_TODO_TEXT, value: value}
      store.dispatch(action)
    }
  })

  // save a new todo
  go(function* () {
    while(true) {
      yield take(chans.onSubmitTodoForm)
      store.dispatch({type: Actions.SAVE_TODO})
      yield put(chans.onPersist, store.getState().todos.todoList)
    }
  })

  //change todo status
  go(function* () {
    while(true) {
      const {value: index, channel} = yield alts([chans.onFinishTodo, chans.onResumeTodo])
      if (channel === chans.onFinishTodo) {        
        store.dispatch({type: Actions.FINISH_TODO, value: index})
      }
      else if (channel === chans.onResumeTodo) {
        store.dispatch({type: Actions.RESUME_TODO, value: index})
      }
      yield put(chans.onPersist, store.getState().todos.todoList)
    }
  })

  //remove all done todos
  go(function* () {
    while(true) {
      yield take(chans.onClearDone)
      store.dispatch({type: Actions.CLEAR_DONE})
      yield put(chans.onPersist, store.getState().todos.todoList)
    }
  })

  //persist to local storage
  go(function* () {
    const savedData = localStorage.getItem('todo-list')
    if (savedData) {
      store.dispatch({type: Actions.CHANGE_TODOS, value: JSON.parse(savedData)}) }
    while(true) {
      const todoList = yield take(chans.onPersist)
      localStorage.setItem('todo-list', JSON.stringify(todoList))
    }
  })

}
