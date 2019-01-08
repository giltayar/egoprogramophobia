'use strict'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {JSDOM} from 'jsdom'
import {render} from 'react-dom'
import React from 'react'
import {Provider} from 'react-redux'
import {fireEvent} from 'dom-testing-library'

import App from '../../containers/App'
import configureStore from '../../store/configureStore'

describe('App', function() {
  let $, $$
  beforeEach(() => {
    global.window = new JSDOM('<div id="root"></div>').window
    global.document = window.document
    $ = document.querySelector.bind(document)
    $$ = document.querySelectorAll.bind(document)
  })

  it('initial list contains no todos', async () => {
    // render the React App
    const store = configureStore()
    render(<Provider store={store}><App /></Provider>, document.getElementById('root'))

    // Validate empty todo list
    expect($$('.todo-list > li')).to.have.length(0)
  })

  it('should be able to add a todo', async () => {
    // render the React App
    const store = configureStore()
    render(<Provider store={store}><App /></Provider>, document.getElementById('root'))

    // Enter "Clean House" in "new todo"
    fireEvent.change($('.new-todo'), {target: {value: 'Clean House'}})
    fireEvent.keyDown($('.new-todo'), {key: 'Enter', keyCode: 13})

    // Validate it's there
    expect([...$$('.todo-list > li')]).to.have.length(1)
    expect($(':nth-child(1) > .view > label').textContent).to.equal('Clean House')
  })
})
