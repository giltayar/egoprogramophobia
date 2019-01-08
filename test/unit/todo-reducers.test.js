'use strict'
import {describe, it} from 'mocha'
import {expect}  from 'chai'

import reducer from '../../reducers/todos'
import {ADD_TODO, DELETE_TODO, COMPLETE_TODO} from '../../constants/ActionTypes'

describe('todo reducers', function() {
  it('should ADD_TODO', () => {
    const newState = reducer([], {type: ADD_TODO, text: 'Clean House'})

    expect(newState).to.eql([{id : 0, completed: false, text: 'Clean House'}])
  })

  it('should DELETE_TODO', () => {
    const todoAddedState = [
      {id : 4, completed: false, text: 'Clean House'},
      {id : 5, completed: false, text: 'Write Tests'}
    ]

    const todoDeletedState = reducer(todoAddedState, {type: DELETE_TODO, id: 4})

    expect(todoDeletedState).to.eql([{id : 5, completed: false, text: 'Write Tests'}])
  })

  it('should COMPLETE_TODO', () => {
    const todoAddedState = [
      {id : 4, completed: false, text: 'Clean House'},
      {id : 5, completed: false, text: 'Write Tests'}
    ]

    const todoCompletedState = reducer(todoAddedState, {type: COMPLETE_TODO, id: 5})

    expect(todoCompletedState).to.eql([
      {id : 4, completed: false, text: 'Clean House'},
      {id : 5, completed: true, text: 'Write Tests'}
    ])
  })
})
