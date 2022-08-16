describe('Search Page Test', () => {
  it('can search for an anime and navigate to the info page', () => {
    cy.visit('http://localhost:3000/animosity#/')

    cy.intercept('https://play.google.com/*', req => req.destroy())
    cy.intercept('https://jnn-pa.googleapis.com/*', req => req.destroy())
    cy.intercept('https://googleads.g.doubleclick.net/*', req => req.destroy())


    cy.intercept('https://www.youtube.com/api/stats/*', req => req.destroy())

    cy.wait(5000)

    // cy.get('[data-testid="recent-promos-carousel"]').click()
    
    cy.get('[data-testid="search-bar-textbox"]').type('Wedding')
    // cy.wait(15000)

    cy.get('[data-testid="search-bar-search-icon"]').click()
   

    cy.wait(3000)

    cy.get('[data-testid="search-bar-container-Wedding-1"]').should('be.visible')

    cy.get('[data-testid="search-page-result-card-Ai Tenshi Densetsu Wedding Peach"]').click()

    cy.wait(9000)

    cy.get('[data-testid="animosity-anime-page-Ai Tenshi Densetsu Wedding Peach"]').should('be.visible')

    cy.get('[class="anime-info-side-content"]').should('be.visible')

  })

  it('can move from page to page for the anime section', () => {
    cy.visit('http://localhost:3000/animosity#/')

    cy.intercept('https://play.google.com/*', req => req.destroy())
    cy.intercept('https://jnn-pa.googleapis.com/*', req => req.destroy())
    cy.intercept('https://googleads.g.doubleclick.net/*', req => req.destroy())


    cy.intercept('https://www.youtube.com/api/stats/*', req => req.destroy())

    cy.wait(5000)

    // cy.get('[data-testid="recent-promos-carousel"]').click()
    
    cy.get('[data-testid="search-bar-textbox"]').type('Dragon')
    // cy.wait(15000)

    cy.get('[data-testid="search-bar-search-icon"]').click()
   

    cy.wait(3000)

    cy.get('[data-testid="search-bar-container-Dragon-1"]').should('be.visible')

    cy.get('[data-testid="search-page-upper-pagination"]').within(() => {
      cy.get('[data-testid="NavigateBeforeIcon"]').should('be.visible')

      cy.get('[data-testid="NavigateNextIcon"]').should('be.visible')
      cy.get('[data-testid="NavigateNextIcon"]').should('be.visible').click()

    })

    cy.wait(3000)

    cy.get('[data-testid="search-bar-container-Dragon-2"]').should('be.visible')

    cy.get('[data-testid="search-page-bottom-pagination"]').within(() => {
      cy.get('[data-testid="NavigateBeforeIcon"]').should('be.visible')

      cy.get('[data-testid="NavigateNextIcon"]').should('be.visible')
      cy.get('[data-testid="NavigateBeforeIcon"]').should('be.visible').click()


      cy.wait(4000)

      cy.scrollTo(0,0)

    // cy.get('[data-testid="search-bar-container-Dragon-1"]').should('be.visible')
    

  })
})

it('should load the pikachu gif if there is no results for an anime', () => {
  cy.visit('http://localhost:3000/animosity#/')

  cy.intercept('https://play.google.com/*', req => req.destroy())
  cy.intercept('https://jnn-pa.googleapis.com/*', req => req.destroy())
  cy.intercept('https://googleads.g.doubleclick.net/*', req => req.destroy())


  cy.intercept('https://www.youtube.com/api/stats/*', req => req.destroy())

  cy.wait(5000)

  // cy.get('[data-testid="recent-promos-carousel"]').click()
  
  cy.get('[data-testid="search-bar-textbox"]').type('xhr')
  // cy.wait(15000)

  cy.get('[data-testid="search-bar-search-icon"]').click()
 

  cy.wait(3000)

  cy.get('[data-testid="no-search-results-found-page"]').should('be.visible')

  cy.get('[data-testid="no-results-found-text"]').should('be.visible')


})

  it('can search for a manga and navigate to the info page', () => {
    cy.visit('http://localhost:3000/animosity#/')

    cy.intercept('https://play.google.com/*', req => req.destroy())
    cy.intercept('https://jnn-pa.googleapis.com/*', req => req.destroy())
    cy.intercept('https://googleads.g.doubleclick.net/*', req => req.destroy())


    cy.intercept('https://www.youtube.com/api/stats/*', req => req.destroy())

    cy.wait(5000)

    cy.get('[data-testid="search-bar-select-button"]').select('Manga', {force:true})
   

    
    cy.get('[data-testid="search-bar-textbox"]').type('Black Jack')
    // cy.wait(15000)

    cy.get('[data-testid="search-bar-search-icon"]').click()
   

    cy.wait(3000)

   

    cy.get('[data-testid="search-bar-container-Black Jack-1"]').should('be.visible')

    cy.get('[data-testid="search-page-result-card-Black Jack"]').click()

    cy.wait(9000)

    cy.get('[data-testid="animosity-manga-page-Black Jack"]').should('be.visible')

    cy.get('[class="anime-info-side-content"]').should('be.visible')

  })

  it('can move from page to page in the manga section', () => {
    cy.visit('http://localhost:3000/animosity#/')

    cy.intercept('https://play.google.com/*', req => req.destroy())
    cy.intercept('https://jnn-pa.googleapis.com/*', req => req.destroy())
    cy.intercept('https://googleads.g.doubleclick.net/*', req => req.destroy())


    cy.intercept('https://www.youtube.com/api/stats/*', req => req.destroy())

    cy.wait(5000)

    cy.get('[data-testid="search-bar-select-button"]').select('Manga', {force:true})
    
    cy.get('[data-testid="search-bar-textbox"]').type('Knight')
    // cy.wait(15000)

    cy.get('[data-testid="search-bar-search-icon"]').click()
   

    cy.wait(3000)

    cy.get('[data-testid="search-bar-container-Knight-1"]').should('be.visible')

    cy.get('[data-testid="search-page-upper-pagination"]').within(() => {
      cy.get('[data-testid="NavigateBeforeIcon"]').should('be.visible')

      cy.get('[data-testid="NavigateNextIcon"]').should('be.visible')
      cy.get('[data-testid="NavigateNextIcon"]').should('be.visible').click()

    })

    cy.wait(3000)

    cy.get('[data-testid="search-bar-container-Knight-2"]').should('be.visible')

    cy.get('[data-testid="search-page-bottom-pagination"]').within(() => {
      cy.get('[data-testid="NavigateBeforeIcon"]').should('be.visible')

      cy.get('[data-testid="NavigateNextIcon"]').should('be.visible')
      cy.get('[data-testid="NavigateBeforeIcon"]').should('be.visible').click()


      cy.wait(4000)

      cy.scrollTo(0,0)

    // cy.get('[data-testid="search-bar-container-Dragon-1"]').should('be.visible')
    

  })
})



  it('should load the pikachu gif if there is no results for a manga', () => {
    cy.visit('http://localhost:3000/animosity#/')

    cy.intercept('https://play.google.com/*', req => req.destroy())
    cy.intercept('https://jnn-pa.googleapis.com/*', req => req.destroy())
    cy.intercept('https://googleads.g.doubleclick.net/*', req => req.destroy())


    cy.intercept('https://www.youtube.com/api/stats/*', req => req.destroy())

    cy.wait(5000)

    cy.get('[data-testid="search-bar-select-button"]').select('Manga', {force:true})
    
    cy.get('[data-testid="search-bar-textbox"]').type('xhr')


    cy.get('[data-testid="search-bar-search-icon"]').click()
   

    cy.wait(3000)

    cy.get('[data-testid="no-search-results-found-page"]').should('be.visible')

    cy.get('[data-testid="no-results-found-text"]').should('be.visible')


  })
})