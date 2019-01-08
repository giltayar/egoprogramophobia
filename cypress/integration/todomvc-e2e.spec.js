/// <reference types="cypress" />
'use strict'

it('should add todos, and complete them', async () => {
  cy.visit('http://localhost:5000')

  // Add todos
  cy.get('.new-todo').type('Clean House{Enter}')
  cy.get('.new-todo').type('Use Redux{Enter}')
  cy.get('.new-todo').type('Write Tests{Enter}')

  // Validate they were added
  cy.get('.todo-list > li').should('have.length', 3)

  cy.get(':nth-child(3) > .view > label').should('have.text', 'Clean House')
  cy.get(':nth-child(2) > .view > label').should('have.text', 'Use Redux')
  cy.get(':nth-child(1) > .view > label').should('have.text', 'Write Tests')

  // Complete a todo
  cy.get(':nth-child(2) > .view > .toggle').click()

  // Filter on active todos
  cy.contains('Active').click()
  // Validate that it was
  cy.get('.todo-list > li').should('have.length', 2)
})
