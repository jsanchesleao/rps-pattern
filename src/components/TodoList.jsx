import React from 'react'
import {dispatchValue, dispatchVoid, dispatch} from '../../framework'

export default ({data, chans}) => (
  <div className="row todo-list-component">
    <div className="col-md-12">
      <ul className="list-group">
        {data.todos.todoList.map((t, i) => (
          <li key={i} className={'list-group-item ' + t.status}>
            <div className="todo-text">
              {t.text}
            </div>
            <div className="todo-actions">
              {t.status === 'done' ?
                (<button className="btn btn-xs btn-default" onClick={dispatch(chans.onResumeTodo, i)}>undo</button>) :
                (<button className="btn btn-xs btn-primary" onClick={dispatch(chans.onFinishTodo, i)}>finish</button>)}
            </div>
          </li>
        ))}
      </ul>
    </div>
    <div className="col-md-12">
      <form onSubmit={dispatchVoid(chans.onSubmitTodoForm)}>
        <div className="form-group">
          <input className="form-control" 
                 placeholder="new todo" 
                 value={data.todos.todoText} 
                 onChange={dispatchValue(chans.onChangeTodoText)} />
        </div>
        <div className="btn-group" role="group">
          <button type="submit" className="btn btn-primary">Add New</button>
          <button onClick={dispatchVoid(chans.onClearDone)} className="btn btn-danger">Clear Done</button>
        </div>
      </form>
    </div>
  </div>
)
