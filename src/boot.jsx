import React from 'react'
import {render} from 'react-dom'
import {combineReducers, createStore} from 'redux'
import chans from './channels'
import todoReducer, {initialState as todoState} from './reducers/todoReducer'
import todoProcesses from './processes/todoProcesses'
import TodoList from './components/TodoList.jsx'

const store = createStore(combineReducers({todos: todoReducer}))
const initialState = {todos: todoState}

const root = document.getElementById('app')

render(<TodoList data={initialState} chans={chans} />, root)

store.subscribe(() => {
  const data = store.getState()
  render(<TodoList data={data} chans={chans}/>, root)
})

todoProcesses(store, chans)
window.store = store
