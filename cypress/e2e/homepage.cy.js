

describe('Homepage Cypress Test', () => {
  it('renders correctly', () => {
    cy.visit('http://localhost:3000/animosity#/')
    
    cy.intercept('https://play.google.com/*', req => req.destroy())
    cy.intercept('https://jnn-pa.googleapis.com/*', req => req.destroy())
    cy.intercept('https://googleads.g.doubleclick.net/*', req => req.destroy())


    cy.intercept('https://www.youtube.com/api/stats/*', req => req.destroy())

    cy.get('[alt="Animosity Logo"]').should('be.visible')
    
    cy.wait(2000)

    cy.scrollTo(0, 1500)
    cy.get('[data-testid="spring-anime-2022-header"]').should('be.visible')
    

    cy.get('[alt="Spy x Family"]').should('be.visible')
    cy.get('[data-testid="spring-anime-carousel"]').within(() =>{
      cy.get('[class="sc-bczRLJ eWjCzc rec rec-arrow rec rec-arrow-right"]').click()

    })

    cy.get('[alt="Tate no Yuusha no Nariagari Season 2"]').should('be.visible')

    

    cy.scrollTo(0, 1500)

    cy.get('[data-testid="summer-anime-2022-header"]').should('be.visible')
    cy.get('[alt="Hataraku Maou-sama!!"]').should('be.visible')
    cy.get('[data-testid="summer-anime-carousel"]').within(() =>{
      cy.get('[class="sc-bczRLJ eWjCzc rec rec-arrow rec rec-arrow-right"]').click()

    })
    cy.get('[alt="Kanojo, Okarishimasu 2nd Season"]').should('be.visible')


    cy.wait(5000)

    cy.scrollTo(0, 1500)

    cy.get('[data-testid="recent-promos-header"]').should('be.visible')
    cy.get('[data-testid="recent-promos-carousel"]').within(() =>{
      cy.get('[class="sc-bczRLJ eWjCzc rec rec-arrow rec rec-arrow-right"]').click()

    })

    cy.scrollTo(0, 1500)

    cy.get('[data-testid="popular-promos-header"]').should('be.visible')
    // cy.get('[data-testid="popular-promos-carousel"]').within(() =>{
    //   cy.get('[class="MuiImageListItemBar-title css-dasnyc-MuiImageListItemBar-title"]').should('have.value','Tensei Oujo to Tensai Reijou no Mahou Kakumei')
    //   cy.get('[class="sc-bczRLJ eWjCzc rec rec-arrow rec rec-arrow-right"]').click()

    // })



  })
  it('should navigate to a spring 2022 anime', () => {
    cy.visit('http://localhost:3000/animosity#/')

    cy.intercept('https://play.google.com/*', req => req.destroy())
    cy.intercept('https://jnn-pa.googleapis.com/*', req => req.destroy())
    cy.intercept('https://googleads.g.doubleclick.net/*', req => req.destroy())


    cy.intercept('https://www.youtube.com/api/stats/*', req => req.destroy())

    cy.wait(4000)

    cy.scrollTo(0, 1500)
    cy.get('[data-testid="spring-anime-2022-header"]').should('be.visible')
    
  
    cy.get('[alt="Spy x Family"]').should('be.visible')
   
    cy.get('[alt="Spy x Family"]').click()

    cy.wait(7000)

    cy.get('[data-testid="animosity-anime-page-Spy x Family"]').should('be.visible')
    cy.get('[class="anime-info-main-info-details"]').should('be.visible')

    cy.get('[class="anime-info-side-content"]').should('be.visible')
    cy.get('[class="anime-info-main-info-container"]').should('be.visible')



  })

  it('should navigate to a summer 2022 anime', () => {
    cy.visit('http://localhost:3000/animosity#/')

    cy.intercept('https://play.google.com/*', req => req.destroy())
    cy.intercept('https://jnn-pa.googleapis.com/*', req => req.destroy())
    cy.intercept('https://googleads.g.doubleclick.net/*', req => req.destroy())


    cy.intercept('https://www.youtube.com/api/stats/*', req => req.destroy())

    cy.wait(4000)

  
    
  
    cy.scrollTo(0, 3500)

    cy.get('[data-testid="summer-anime-2022-header"]').should('be.visible')
    cy.get('[alt="Hataraku Maou-sama!!"]').should('be.visible')
    cy.get('[alt="Hataraku Maou-sama!!"]').should('be.visible').click()


    cy.wait(7000)

    cy.get('[data-testid="animosity-anime-page-Hataraku Maou-sama!!"]').should('be.visible')
    cy.get('[class="anime-info-main-info-details"]').should('be.visible')

    cy.get('[class="anime-info-side-content"]').should('be.visible')
    cy.get('[class="anime-info-main-info-container"]').should('be.visible')


  })

  

  it('should successfully notice a recent promo Youtube Link', () => {
    cy.visit('http://localhost:3000/animosity#/')

    cy.intercept('https://play.google.com/*', req => req.destroy())
    cy.intercept('https://jnn-pa.googleapis.com/*', req => req.destroy())
    cy.intercept('https://googleads.g.doubleclick.net/*', req => req.destroy())


    cy.intercept('https://www.youtube.com/api/stats/*', req => req.destroy())

    cy.wait(4000)

    cy.scrollTo(0, 2500)

    // cy.wait(15000)

    
    cy.get('[data-testid="recent-promos-carousel"]').within(() =>{
      cy.get('[data-testid="recent-promos-link-Tensei Oujo to Tensai Reijou no Mahou Kakumei"]').should('have.attr', 'href')


    })

    // cy.wait(3000)

    // cy.url().should('include', 'youtube.com/')



  })

  it('should successfully notice a popular promo Youtube Link', () => {
    // cy.visit('http://localhost:3000/animosity#/')

    cy.intercept('https://play.google.com/*', req => req.destroy())
    cy.intercept('https://jnn-pa.googleapis.com/*', req => req.destroy())
    cy.intercept('https://googleads.g.doubleclick.net/*', req => req.destroy())


    cy.intercept('https://www.youtube.com/api/stats/*', req => req.destroy())

    cy.wait(8000)

    cy.scrollTo(0, 3500)

    // cy.wait(15000)

    
    cy.get('[data-testid="popular-promos-carousel"]').within(() =>{
      cy.get('[data-testid="popular-promos-link-Shingeki no Kyojin"]').should('have.attr', 'href')


    })

    // cy.wait(3000)

    // cy.url().should('include', 'youtube.com/')



  })

  it('can navigate to banner anime', () => {
    cy.visit('http://localhost:3000/animosity#/')

    cy.intercept('https://play.google.com/*', req => req.destroy())
    cy.intercept('https://jnn-pa.googleapis.com/*', req => req.destroy())
    cy.intercept('https://googleads.g.doubleclick.net/*', req => req.destroy())


    cy.intercept('https://www.youtube.com/api/stats/*', req => req.destroy())

    cy.wait(4000)

    // cy.get('[alt="Full Metal Alchemist: Brotherhood]').should('be.visible')
    cy.get('[data-testid="animosity-banner-link-Full Metal Alchemist: Brotherhood"]').click({force:true})


    cy.wait(7000)

    cy.get('[data-testid="animosity-anime-page-Fullmetal Alchemist: Brotherhood"]').should('be.visible')
    cy.get('[class="anime-info-main-info-details"]').should('be.visible')

    cy.get('[class="anime-info-side-content"]').should('be.visible')
    cy.get('[class="anime-info-main-info-container"]').should('be.visible')


  })

  it('search for an anime from the homepage', () => {
    cy.visit('http://localhost:3000/animosity#/')

    cy.intercept('https://play.google.com/*', req => req.destroy())
    cy.intercept('https://jnn-pa.googleapis.com/*', req => req.destroy())
    cy.intercept('https://googleads.g.doubleclick.net/*', req => req.destroy())


    cy.intercept('https://www.youtube.com/api/stats/*', req => req.destroy())

    cy.wait(4000)

    // cy.get('[data-testid="recent-promos-carousel"]').click()
    
    cy.get('[data-testid="search-bar-textbox"]').type('Ranma')
    // cy.wait(15000)

    cy.get('[data-testid="search-bar-search-icon"]').click()
   

    cy.wait(3000)

    cy.get('[class="search-page-contents"]').should('be.visible')


    // cy.url().should('include', 'youtube.com/')



  })

  it('search for an manga from the homepage', () => {
    cy.visit('http://localhost:3000/animosity#/')

    cy.intercept('https://play.google.com/*', req => req.destroy())
    cy.intercept('https://jnn-pa.googleapis.com/*', req => req.destroy())
    cy.intercept('https://googleads.g.doubleclick.net/*', req => req.destroy())


    cy.intercept('https://www.youtube.com/api/stats/*', req => req.destroy())

    cy.wait(4000)

    cy.get('[data-testid="search-bar-select-button"]').select('Manga', {force:true})
   

    
    cy.get('[data-testid="search-bar-textbox"]').type('Ranma')
    // cy.wait(15000)

    cy.get('[data-testid="search-bar-search-icon"]').click()
   

    cy.wait(3000)

    cy.get('[class="search-page-contents"]').should('be.visible')


    



  })

  it('navigate to the top anime page', () => {
    cy.visit('http://localhost:3000/animosity#/')

    cy.intercept('https://play.google.com/*', req => req.destroy())
    cy.intercept('https://jnn-pa.googleapis.com/*', req => req.destroy())
    cy.intercept('https://googleads.g.doubleclick.net/*', req => req.destroy())


    cy.intercept('https://www.youtube.com/api/stats/*', req => req.destroy())

    cy.wait(4000)

    cy.get('[data-testid="navbar-anime-dropdown"]').click()
    cy.get('[data-testid="navbar-anime-dropdown-top-anime"]').click()

   

    cy.get('[data-testid="top-anime-page-upper-page-section"]').should('be.visible')
    cy.get('[data-testid="top-anime-page-contents"]').should('be.visible')
    // cy.get('[data-testid="search-bar-textbox"]').type('Ranma')
    // // cy.wait(15000)

    // cy.get('[data-testid="search-bar-search-icon"]').click()
   

    // cy.wait(3000)

    // cy.get('[class="search-page-contents"]').should('be.visible')


    



  })
  it('navigate to the top manga page', () => {
    cy.visit('http://localhost:3000/animosity#/')

    cy.intercept('https://play.google.com/*', req => req.destroy())
    cy.intercept('https://jnn-pa.googleapis.com/*', req => req.destroy())
    cy.intercept('https://googleads.g.doubleclick.net/*', req => req.destroy())


    cy.intercept('https://www.youtube.com/api/stats/*', req => req.destroy())

    cy.wait(4000)

    cy.get('[data-testid="navbar-manga-dropdown"]').click()
    cy.get('[data-testid="navbar-manga-dropdown-top-manga"]').click()

   

    // cy.get('[data-testid="top-manga-page-upper-page-section"]').should('be.visible')
    cy.get('[data-testid="top-manga-page-contents"]').should('be.visible')
    cy.get('[data-testid="top-manga-result-cards"]').should('be.visible')

    // cy.get('[data-testid="search-bar-textbox"]').type('Ranma')
    // // cy.wait(15000)

    // cy.get('[data-testid="search-bar-search-icon"]').click()
   

    // cy.wait(3000)

    // cy.get('[class="search-page-contents"]').should('be.visible')


    



  })
})