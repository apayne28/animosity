import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router} from "react-router-dom";
import TopAnime, {getTopScoredAnime} from './TopAnime';



// jest.setTimeout(7000)
global.fetch = jest.fn(() => {
    Promise.resolve({
        json: () => Promise.resolve()
    })
})

test('render the top anime page', async () => {
    // const topAnime = await getTopScoredAnime(  )
  render(
  <Router>
    <TopAnime />
  </Router>
  );
 
  expect(screen.getByTestId('top-anime-page-upper-page-section')).toBeInTheDocument()
 expect(screen.getByTestId('top-anime-page-contents')).toBeInTheDocument()
   expect(screen.getByTestId('top-anime-result-cards')).toBeInTheDocument()
  expect(screen.getByTestId('top-anime-page-lower-page-section')).toBeInTheDocument()




});