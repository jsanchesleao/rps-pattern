import {chan, putAsync} from 'js-csp'
import _ from 'lodash'

export const createActions = names => {
  const actions = {}
  names.forEach(n => actions[n] = n)
  return actions
}

export const createChans = names => {
  const chans = {}
  names.forEach(n => chans[n] = chan())
  return chans
}

export const dispatchValue = function(ch) {
  return function(e) {
    putAsync(ch, e.target.value)
  }
}

export const dispatchVoid = function(ch) {
  return function(e) {
    e.preventDefault()
    putAsync(ch, 1)
  }
}

export const dispatch = function(ch, value) {
  return function(e) {
    e.preventDefault()
    putAsync(ch, value)
  }
}
