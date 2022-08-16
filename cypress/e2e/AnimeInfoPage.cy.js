describe('Anime Info Page Cypress Test', () => {
  it('Successfully navigate to an anime info page', () => {
    cy.visit('http://localhost:3000/animosity#/')

   

    cy.wait(5000)

    // cy.get('[data-testid="recent-promos-carousel"]').click()
    
    cy.get('[data-testid="search-bar-textbox"]').type('Lodoss')
    // cy.wait(15000)

    cy.get('[data-testid="search-bar-search-icon"]').click()
   

    cy.wait(2000)

    cy.get('[class="search-page-contents"]').should('be.visible')

    cy.get('[data-testid="search-page-result-card-view-more-link-Lodoss-tou Senki"]').click()

    cy.wait(9000)

    cy.get('[data-testid="animosity-anime-page-Lodoss-tou Senki"]').should('be.visible')

    cy.get('[class="anime-info-main-info-content"]').should('be.visible').within(() =>{
      cy.get('[data-testid="anime-info-page-trailer-Lodoss-tou Senki"]').should('be.visible')
  
      })
    cy.get('[class="anime-info-side-content"]').should('be.visible')
    cy.get('[class="anime-info-alternative-titles-container"]').should('be.visible')
    cy.get('[class="anime-info-score"]').should('be.visible')
    cy.get('[class="anime-info-information"]').should('be.visible')
    cy.get('[class="anime-info-statistics"]').should('be.visible')
    cy.get('[class="anime-info-main-info-container"]').should('be.visible')
    cy.get('[class="anime-info-main-info-details"]').should('be.visible')
    cy.get('[class="anime-info-main-info-content"]').should('be.visible')
  

    cy.get('[class="anime-info-main-synopsis"]').should('be.visible')
    cy.get('[class="anime-info-main-synopsis"]').within(() => {
      cy.get('[data-testid="anime-info-page-synopsis-text-Lodoss-tou Senki"]').should('be.visible')
      cy.get('[data-testid="anime-info-page-synopsis-text-Lodoss-tou Senki"]').contains('Created from the aftermath of the last great battle of the gods, Lodoss and its kingdoms have been plagued by war for thousands of years. As a quiet peace and unity finally become foreseeable over the land, an unknown evil begins to stir. An ancient witch has awakened, bent on preserving the island of Lodoss by creating political unbalance throughout the many kingdoms and keeping any one from maintaining central control. Only a mixed-race party of six young champions, led by the young warrior Parn, stand between this new threat and Lodoss\'\ descent back into the darkness of war and destruction. (Source: ANN)')

    })

    cy.get('[data-testid="animosity-anime-page-background"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-background-text"]').contains('N/A')

    cy.get('[data-testid="animosity-anime-page-related-anime"]').should('be.visible')

  })

  it('can use the anime details navbar to select items', () => {
    cy.visit('http://localhost:3000/animosity#/')

   

    cy.wait(5000)

    // cy.get('[data-testid="recent-promos-carousel"]').click()
    
    cy.get('[data-testid="search-bar-textbox"]').type('Lodoss')
    // cy.wait(15000)

    cy.get('[data-testid="search-bar-search-icon"]').click()
   

    cy.wait(3000)

    cy.get('[class="search-page-contents"]').should('be.visible')

    cy.get('[data-testid="search-page-result-card-view-more-link-Lodoss-tou Senki"]').click()

    cy.wait(9000)

    cy.get('[data-testid="animosity-anime-page-Lodoss-tou Senki"]').should('be.visible')

    cy.get('[data-testid="anime-info-anime-details-bar"]').should('be.visible')

    cy.get('[data-testid="anime-info-anime-details-bar-details"]').should('be.visible')

    cy.get('[data-testid="anime-info-anime-details-bar-characters"]').should('be.visible')

    cy.get('[data-testid="anime-info-anime-details-bar-recommendations"]').should('be.visible')

    cy.get('[data-testid="anime-info-anime-details-bar-characters"]').click()
    cy.wait(3000)

    cy.get('[data-testid="animosity-anime-page-side-profile-Lodoss-tou Senki"]').should('be.visible')

    cy.get('[data-testid="anime-info-page-character-list-entry-Deedlit"]').should('be.visible')

    cy.get('[data-testid="anime-info-page-character-list-entry-Parn"]').should('be.visible')

    cy.get('[data-testid="anime-info-page-character-list-entry-Ashram"]').should('be.visible')

    cy.get('[data-testid="anime-info-anime-details-bar-recommendations"]').click()

    cy.wait(3000)


    cy.get('[data-testid="animosity-anime-page-side-profile-Lodoss-tou Senki"]').should('be.visible')

    cy.get('[data-testid="anime-info-anime-recs-list-page-Slayers"]').should('be.visible')

    cy.get('[data-testid="anime-info-anime-recs-list-page-Kenpuu Denki Berserk"]').should('be.visible')

    cy.get('[data-testid="anime-info-anime-recs-list-page-Tenkuu no Escaflowne"]').should('be.visible')

    cy.get('[data-testid="anime-info-anime-details-bar-details"]').click()

    cy.wait(9000)

    cy.get('[data-testid="animosity-anime-page-Lodoss-tou Senki"]').should('be.visible')
  })
    
  it('should have the correct items in the related anime sections. Items should be clickable', () => {

    cy.visit('http://localhost:3000/animosity#/')

   

    cy.wait(5000)

    // cy.get('[data-testid="recent-promos-carousel"]').click()
    
    cy.get('[data-testid="search-bar-textbox"]').type('Lodoss')
    // cy.wait(15000)

    cy.get('[data-testid="search-bar-search-icon"]').click()
   

    cy.wait(2000)

    cy.get('[class="search-page-contents"]').should('be.visible')

    cy.get('[data-testid="search-page-result-card-view-more-link-Lodoss-tou Senki"]').click()

    cy.wait(9000)

    cy.get('[data-testid="animosity-anime-page-Lodoss-tou Senki"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-related-anime"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-related-anime"]').should('be.visible').within(() => {
      cy.get('[data-testid="animosity-anime-page-related-anime-entry-link-Lodoss-tou Senki"]').should('be.visible')

      cy.get('[data-testid="animosity-anime-page-related-anime-entry-Lodoss-tou Senki: Eiyuu Kishi Den"]').should('be.visible')

      cy.get('[data-testid="animosity-anime-page-related-anime-entry-Meshimase Lodoss-tou Senki: Sorette Oishii no?"]').should('be.visible')

      cy.get('[data-testid="animosity-anime-page-related-anime-entry-Hajimari no Boukensha-tachi: Legend of Crystania"]').should('be.visible')

      cy.get('[data-testid="animosity-anime-page-related-anime-entry-Legend of Crystania"]').should('be.visible')

      cy.get('[data-testid="animosity-anime-page-related-anime-entry-link-Lodoss-tou Senki"]').click()
    })

    cy.wait(9000)

    cy.get('[data-testid="animosity-manga-page-Lodoss-tou Senki"]').should('be.visible')

  })

  it('should be able to see the character section. The view more link should work', () => {

    cy.visit('http://localhost:3000/animosity#/')

   

    cy.wait(5000)

    // cy.get('[data-testid="recent-promos-carousel"]').click()
    
    cy.get('[data-testid="search-bar-textbox"]').type('Lodoss')
    // cy.wait(15000)

    cy.get('[data-testid="search-bar-search-icon"]').click()
   

    cy.wait(3000)

    cy.get('[class="search-page-contents"]').should('be.visible')

    cy.get('[data-testid="search-page-result-card-view-more-link-Lodoss-tou Senki"]').click()

    cy.wait(9000)

    cy.get('[data-testid="animosity-anime-page-Lodoss-tou Senki"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-character-section"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-character-section-view-more-link"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-character-section-view-more-link"]').should('be.visible').click()

    cy.get('[data-testid="anime-info-page-character-list"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-side-profile-Lodoss-tou Senki"]').should('be.visible')

    cy.get('[data-testid="anime-info-anime-details-bar"]').should('be.visible')

    cy.get('[data-testid="anime-info-anime-details-bar"]').should('be.visible').within(() => {
      cy.get('[data-testid="anime-info-anime-details-bar-details"]').should('be.visible')
      cy.get('[data-testid="anime-info-anime-details-bar-characters"]').should('be.visible')
     
    })

    cy.get('[data-testid="animosity-anime-page-side-profile-Lodoss-tou Senki"]').should('be.visible')

    cy.get('[data-testid="anime-info-page-character-list-entry-Deedlit"]').should('be.visible')

    cy.get('[data-testid="anime-info-page-character-list-entry-Parn"]').should('be.visible')

    cy.get('[data-testid="anime-info-page-character-list-entry-Ashram"]').should('be.visible')

    cy.get('[data-testid="anime-info-page-character-list-entry-Deedlit"]').click()

    cy.wait(2000)

    cy.get('[data-testid="anime-character-main-Deedlit"]').should('be.visible')

    cy.get('[data-testid="anime-character-side-content-Deedlit"]').should('be.visible')

    cy.get('[data-testid="anime-character-header-Deedlit"]').should('be.visible')

  })

  it('should be able to click the arrows in the character carousel. Characters should be clickable', () => {

    cy.visit('http://localhost:3000/animosity#/')

   

    cy.wait(5000)

    // cy.get('[data-testid="recent-promos-carousel"]').click()
    
    cy.get('[data-testid="search-bar-textbox"]').type('Lodoss')
    // cy.wait(15000)

    cy.get('[data-testid="search-bar-search-icon"]').click()
   

    cy.wait(2000)

    cy.get('[class="search-page-contents"]').should('be.visible')

    cy.get('[data-testid="search-page-result-card-view-more-link-Lodoss-tou Senki"]').click()

    cy.wait(9000)

    cy.get('[data-testid="animosity-anime-page-Lodoss-tou Senki"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-character-section"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-character-section-view-more-link"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-character-section-carousel"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-character-section-carousel"]').within(() => {
      cy.get('[class="sc-bczRLJ eAyARa rec rec-arrow rec rec-arrow-left"]').should('be.visible')

      cy.get('[class="sc-bczRLJ eWjCzc rec rec-arrow rec rec-arrow-right"]').should('be.visible')
  
      cy.get('[class="sc-bczRLJ eWjCzc rec rec-arrow rec rec-arrow-right"]').should('be.visible').click()
  
      cy.get('[data-testid="anime-info-page-character-link-Ashram"]').should('be.visible')
  
      cy.get('[data-testid="anime-info-page-character-link-Beld"]').should('be.visible')
  
      cy.get('[class="sc-bczRLJ eWjCzc rec rec-arrow rec rec-arrow-left"]').click()
  
      cy.get('[data-testid="anime-info-page-character-link-Deedlit"]').should('be.visible')
  
      cy.get('[data-testid="anime-info-page-character-link-Parn"]').should('be.visible')
  
      cy.get('[data-testid="anime-info-page-character-link-Deedlit"]').click()
      
    })

  

    cy.wait(2000)

    cy.get('[data-testid="anime-character-main-Deedlit"]').should('be.visible')

    cy.get('[data-testid="anime-character-side-content-Deedlit"]').should('be.visible')

    cy.get('[data-testid="anime-character-header-Deedlit"]').should('be.visible')
    

  })

  it('should be able to see the recommended section. The view more link should work', () => {

    cy.visit('http://localhost:3000/animosity#/')

   

    cy.wait(5000)

    // cy.get('[data-testid="recent-promos-carousel"]').click()
    
    cy.get('[data-testid="search-bar-textbox"]').type('Lodoss')
    // cy.wait(15000)

    cy.get('[data-testid="search-bar-search-icon"]').click()
   

    cy.wait(3000)

    cy.get('[class="search-page-contents"]').should('be.visible')

    cy.get('[data-testid="search-page-result-card-view-more-link-Lodoss-tou Senki"]').click()

    cy.wait(9000)

    cy.get('[data-testid="animosity-anime-page-Lodoss-tou Senki"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-recommended-anime-section"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-recommended-anime-section-view-more-link"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-recommended-anime-section-view-more-link"]').should('be.visible').click()

    cy.get('[data-testid="anime-info-anime-recs-list-page"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-side-profile-Lodoss-tou Senki"]').should('be.visible')

    cy.get('[data-testid="anime-info-anime-details-bar"]').should('be.visible')

    cy.get('[data-testid="anime-info-anime-details-bar"]').should('be.visible').within(() => {
      cy.get('[data-testid="anime-info-anime-details-bar-details"]').should('be.visible')
      cy.get('[data-testid="anime-info-anime-details-bar-characters"]').should('be.visible')
     
    })

    cy.get('[data-testid="animosity-anime-page-side-profile-Lodoss-tou Senki"]').should('be.visible')

    cy.get('[data-testid="anime-info-anime-recs-list-page-Slayers"]').should('be.visible')

    cy.get('[data-testid="anime-info-anime-recs-list-page-Kenpuu Denki Berserk"]').should('be.visible')

    cy.get('[data-testid="anime-info-anime-recs-list-page-Tenkuu no Escaflowne"]').should('be.visible')

    cy.wait(3000)


    cy.get('[data-testid="anime-info-anime-recs-list-page-Slayers"]').click()

    cy.wait(7000)

    cy.get('[data-testid="animosity-anime-page-Slayers"]').should('be.visible')

   

  })

  it('should be able to click the arrows in the recommended anime carousel. Anime should be clickable', () => {

    cy.visit('http://localhost:3000/animosity#/')

   

    cy.wait(5000)

    // cy.get('[data-testid="recent-promos-carousel"]').click()
    
    cy.get('[data-testid="search-bar-textbox"]').type('Lodoss')
    // cy.wait(15000)

    cy.get('[data-testid="search-bar-search-icon"]').click()
   

    cy.wait(3000)

    cy.get('[class="search-page-contents"]').should('be.visible')

    cy.get('[data-testid="search-page-result-card-view-more-link-Lodoss-tou Senki"]').click()

    cy.wait(9000)

    cy.get('[data-testid="animosity-anime-page-Lodoss-tou Senki"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-recommended-anime-section"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-recommended-anime-section-view-more-link"]').should('be.visible')


    cy.get('[data-testid="animosity-anime-page-recommended-anime-carousel"]').should('be.visible')

    cy.get('[data-testid="animosity-anime-page-recommended-anime-carousel"]').within(() => {
      cy.get('[class="sc-bczRLJ eAyARa rec rec-arrow rec rec-arrow-left"]').should('be.visible')

      cy.get('[class="sc-bczRLJ eWjCzc rec rec-arrow rec rec-arrow-right"]').should('be.visible')
  
      cy.get('[class="sc-bczRLJ eWjCzc rec rec-arrow rec rec-arrow-right"]').should('be.visible').click()
  
      cy.get('[data-testid="anime-info-page-rec-anime-link-Tenkuu no Escaflowne"]').should('be.visible')
  
      cy.get('[data-testid="anime-info-page-rec-anime-link-Seirei no Moribito"]').should('be.visible')
  
      cy.get('[class="sc-bczRLJ eWjCzc rec rec-arrow rec rec-arrow-left"]').click()
  
      cy.get('[data-testid="anime-info-page-rec-anime-link-Slayers"]').should('be.visible')
  
      cy.get('[data-testid="anime-info-page-rec-anime-link-Kenpuu Denki Berserk"]').should('be.visible')
  
      cy.get('[data-testid="anime-info-page-rec-anime-link-Slayers"]').click()
      
    })

    cy.wait(7000)

    cy.get('[data-testid="animosity-anime-page-Slayers"]').should('be.visible')
    

  })

  

  })
