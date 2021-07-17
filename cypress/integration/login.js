require('cypress-xpath')

describe('Register QBR user for Marketing Campaign', function () {
    before('Fixtures', function () {
        cy.fixture('viewPort.json')
        	.as('viewPort');
    });

    beforeEach(function () {
        // Need to improve the way of running tests on different viewport
        // Will have to discuss on this and will be picked in future card
				// cy.viewport(this.viewPort.macbook.keyword);
    });

    context('Launch Homepage', () => {
        it('Check the link availability', function () {	
					cy.viewport(this.viewPort.macbook.keyword);			
					cy.visit('https://phptravels.com/demo/')
        })

        it('Check for Page Title', function ()  {
					cy.get('head title') //find title in DOM
						.should('contain', 'Demo Script Test drive')
        })

        it('Find phptravels.net and navigate', function ()  {
					cy.get('a').invoke('removeAttr', 'target')
					cy.get('a').find('small')
							.contains('http://www.phptravels.net')
							.click()
        })

        it('Go to My Account and Login', function () {
          cy.xpath('//a[normalize-space()="My Account"]').click()
          cy.xpath('//a[normalize-space()="Login"]').click()
        })

				it.skip('Enter Login Credentials ', () => {
					//wait to render all the elements because it is iframe of different domain.
					cy.wait(5000)
	
					//Get all thecontent of iframe
					cy.get('')
							.then(($iframe) => {
									const $body = $iframe.contents().find('body')

									cy.wrap($body)
											.find('btn btn-primary btn-lg btn-block loginbtn')
											.click()
							})
				})

				it('Enter Login Credentials ', function ()  {
					cy.viewport(this.viewPort.macbook.keyword);
					cy.wait(2000)
					cy.xpath('//span[normalize-space()="Email"]')
						.type('user@phptravels.com')

					cy.xpath('//span[normalize-space()="Password"]')
						.type('demouser')

					cy.wait(3000)
					cy.get('#loginfrm').submit()
					  .find('button[class="btn btn-primary btn-lg btn-block loginbtn"]')
						.click({ force: true })
				})

        it.skip('Check for Invoice', function () {
            cy.wait(5000)
            cy.get('.full-screen-preview__frame')
                .then(($iframe) => {
                    const $body = $iframe.contents()    .find('body')
                    cy.wrap($body)
                        .find('a').contains('Invoice').
                        invoke('removeAttr', 'target')
                        .click()
                })
        })


        it.skip('Verfiy page has INVOICE', () => {
            cy.wait(5000)

            cy.get('.full-screen-preview__frame')
                .then(($iframe) => {
                    const $body = $iframe.contents().find('body')
                    cy.wrap($body)
                        .find('div').contains('Invoice')
                })
        })

    })
});