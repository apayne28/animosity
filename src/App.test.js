import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router} from "react-router-dom";

import App from './App';

test('renders learn react link', () => {
  render(
  <Router>
<App />
  </Router>
  );
  const animosityLogo = screen.getByAltText("Animosity Logo")
  expect(animosityLogo).toBeInTheDocument();
});
