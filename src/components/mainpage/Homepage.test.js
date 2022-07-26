import { render, screen } from "@testing-library/react";
import HomepageContent from "./HomepageContent";

test("renders homepage", () => {
  render(<HomepageContent />);
  const springAnimeText = screen.getByText(/spring anime/i);
  const springAnimeCarousel = screen.getByTestId("spring-anime-carousel");

  const summerAnimeText = screen.getByText(/summer anime/i);
  const summerAnimeCarousel = screen.getByTestId("summer-anime-carousel");

  const recentPromosText = screen.getByText(/recent promos/i);
  const recentPromosCarousel = screen.getByTestId("recent-promos-carousel");

  const popularPromosText = screen.getByText(/popular promos/i);
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
