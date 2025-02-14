// https://docs.cypress.io/api/introduction/api.html

function login() {
  cy.visit('/')
  cy.get('input[name="email"]').type('david@test.com')
  cy.get('input[name="psw"]').type('testtest')
  cy.get('button[type="submit"]').click()
}

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Authentication')
  })

  it('test login', () => {
    login()
    cy.contains('h1', 'Search Films')
  })
})

describe('Search Films', () => {
  it('search films', () => {
    login()
    cy.contains('h1', 'Search Films')
    cy.get('input[id="search"]').type('batman')
    cy.get('.title').contains('Star Wars: Episode V - The Empire Strikes Back')
  })
})   
