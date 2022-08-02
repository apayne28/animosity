import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router} from "react-router-dom";
import TopAnime from './TopAnime';



jest.setTimeout(12000)

test('render the top anime page', async () => {
  render(
  <Router>
    <TopAnime />
  </Router>
  );
 
  await waitFor(() => expect(screen.getByTestId('top-anime-page-upper-page-section')).toBeInTheDocument(), {timeout: 12000})
  await waitFor(() => expect(screen.getByTestId('top-anime-page-contents')).toBeInTheDocument(), {timeout: 12000})
  await waitFor(() => expect(screen.getByTestId('top-anime-result-cards')).toBeInTheDocument(), {timeout: 12000})
  await waitFor(() => expect(screen.getByTestId('top-anime-page-lower-page-section')).toBeInTheDocument(), {timeout: 12000})




});