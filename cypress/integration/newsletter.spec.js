describe('It checks to see if people can sign up for the newsletter', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.fixture('newsletter-signup').as('user')
  })
  it('successfully fills out the form and submits it and checks there is a response', function () {
    cy.server()
    cy.get('form[data-cy="newsletter"]').within(() => {
      cy.get('[type="email"]')
        .type(this.user.email)
        .should('have.value', this.user.email)
      cy.route('POST', '/', 'fixture:newsletter-signup/user').as('user')
      cy.get('[type="submit"]').click()
    })
    cy.wait(1000)
    cy.get('form').next().should('contain', 'already registered')
  })
})
