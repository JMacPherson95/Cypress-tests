/// <reference types="cypress" />
const { _ } = Cypress;

// loops over the jQeury elements and extreacts the text content
const toStrings = (cells$) => _.map(cells$, 'textContent');
//loops through each element given and removes £
const sanatizeNumbers = (string) =>
  _.map(string, (i) => {
    return i.replace('£', '');
  });
//converts them to numbers
const toNumbers = (prices) => _.map(prices, Number);

describe('Tech tests of live categories page', () => {
  beforeEach(() => {
    cy.visit('https://www.cromwell.co.uk/shop/abrasives/cutting/c/090901');
  });

  // GIVEN the user is on this category page WHEN no further options are clicked THEN ten products should be displayed
  it('Should only be 10 products displayed when no further options are clicked', () => {
    cy.get('[data-testid="ProductCard"]').should('have.length', 10);
  });

  // GIVEN user is on this category page WHEN the user changes ‘Rows per page:’ to 25 (pagination) THEN 25 products should be displayed
  it('Should display 25 products when the user selects 25 per page - Top of page', () => {
    cy.get('[data-testid=paginationRowsPerPageMenu]').first().click();
    cy.get('[data-value=25]').click();

    cy.get('[data-testid="ProductCard"]').should('have.length', 25);
  });

  it('Should display 25 products when the user selects 25 per page - Bottom of page', () => {
    cy.get('[data-testid=paginationRowsPerPageMenu]').last().click();
    cy.get('[data-value=25]').click();

    cy.get('[data-testid="ProductCard"]').should('have.length', 25);
  });

  // GIVEN user is on this category page WHEN the user changes ‘Rows per page’ to 25 (pagination) AND user has clicked ‘Show Out of Stock’ THEN check there is at least one product that show ‘OUT OF STOCK’ in the results
  it('Should show an out of stock item when user selects show out of stock on 25 products per page', () => {
    cy.get('[data-testid=paginationRowsPerPageMenu]').first().click();
    cy.get('[data-value=25]').click();

    cy.get('[data-testid="ProductCard"]').should('have.length', 25);

    cy.get('[data-testid="filterCheckbox-Show Out of Stock"]').click();

    cy.contains('[data-testid="stockMessage"]', 'OUT OF STOCK').should(
      'be.visible'
    );
  });

  // GIVEN user is on this category page WHEN the user selects ‘Sort By:’ - ‘Price Low to High’ THEN 10 products should be displayed in order of price (low to high).
  it.only('10 products should be sorted price low - high', () => {
    cy.get('[data-testid="menuSortBy"]').click();
    cy.get('[data-value="price-asc"]').click();

    cy.wait(3000);

    const elems = cy.get('[data-testid="priceLabel"]', { multilpe: true });
    elems.should('have.length', 10);

    //gives an array of jQeury elements with the prices
    cy.get('[data-testid="priceLabel"]', { multilpe: true })
      //extract the prices as strings
      .then(toStrings)
      //remove the £ from the strings
      .then(sanatizeNumbers)
      //cast the string to a number
      .then(toNumbers)
      //pass in array of numbers as they appear on the page, clones array, sorts and then compares
      .then((prices) => {
        const sorted = _.sortBy(prices);

        expect(prices, 'cells are sorted').to.deep.equal(sorted);
      });
  });
});
