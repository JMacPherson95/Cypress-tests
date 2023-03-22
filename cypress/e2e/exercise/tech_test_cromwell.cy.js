/// <reference types="cypress" />

describe('Tech tests of live categories page', () => {

    beforeEach(() => {
        cy.visit('https://www.cromwell.co.uk/shop/abrasives/cutting/c/090901')
      })

    it('Should only be 10 products displayed when no further options are clicked', () => {

        cy.get('[data-testid="ProductCard"]').should('have.length', 10)

    })

    it.only('Should display 25 products when the user selects 25 per page - Top of page', () => {

        cy.get('[data-testid=paginationRowsPerPageMenu]').first().click()
        cy.get('[data-value=25]').click()
        
       

        cy.get('[data-testid="ProductCard"]').should('have.length', 25)
    })

    it('Should display 25 products when the user selects 25 per page - Bottom of page', () => {

        cy.get('[data-testid=paginationRowsPerPageMenu]').last().click()
        cy.get('[data-value=25]').click()
        
       

        cy.get('[data-testid="ProductCard"]').should('have.length', 25)
    })

    it('Should show an out of stock item when user selects show out of stock on 25 products per page', () => {
        
        cy.get('[data-testid=paginationRowsPerPageMenu]').first().click()
        cy.get('[data-value=25]').click()

        cy.get('[data-testid="ProductCard"]').should('have.length', 25)

        cy.get('[data-testid="filterCheckbox-Show Out of Stock"]').click()

        cy.contains('[data-testid="stockMessage"]', 'OUT OF STOCK').should('be.visible')
    })

    
})





