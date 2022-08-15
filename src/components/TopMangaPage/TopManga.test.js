import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router} from "react-router-dom";
import TopManga from './TopManga';



jest.setTimeout(7000)

test('render the top manga page', async () => {
  render(
  <Router>
    <TopManga />
  </Router>
  );
 

  await waitFor(() => expect(screen.getByTestId('top-manga-page-contents')).toBeInTheDocument(), {timeout: 7000})
  await waitFor(() => expect(screen.getByTestId('top-manga-result-cards')).toBeInTheDocument(), {timeout: 7000})



});