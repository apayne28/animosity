import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router} from "react-router-dom";
import HomepageContent from "./HomepageContent";

test("renders homepage", () => {
  render(
  <Router>
<HomepageContent />
  </Router>
  );
  const springAnimeText = screen.getByTestId("spring-anime-2022-header")
  const springAnimeCarousel = screen.getByTestId("spring-anime-carousel");

  const summerAnimeText = screen.getByTestId("summer-anime-2022-header")
  const summerAnimeCarousel = screen.getByTestId("summer-anime-carousel");

  const recentPromosText = screen.getByTestId("recent-promos-header")
  const recentPromosCarousel = screen.getByTestId("recent-promos-carousel");

  const popularPromosText = screen.getByTestId("popular-promos-header")
  const popularPromosCarousel = screen.getByTestId("popular-promos-carousel");

  expect(springAnimeText).toBeInTheDocument();
  expect(springAnimeCarousel).toBeInTheDocument();

  expect(summerAnimeText).toBeInTheDocument();
  expect(summerAnimeCarousel).toBeInTheDocument();

  expect(recentPromosText).toBeInTheDocument();
  expect(recentPromosCarousel).toBeInTheDocument();

  expect(popularPromosText).toBeInTheDocument();
  expect(popularPromosCarousel).toBeInTheDocument();
});
