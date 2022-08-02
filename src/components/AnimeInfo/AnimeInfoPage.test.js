import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter as Router} from "react-router-dom";
import AnimeInfoPage from "./AnimeInfoPage";


jest.setTimeout(12000)



test("renders loading screen",async  ()   => {

    render(

        <Router>
            <AnimeInfoPage animeId={5114} />
        </Router>
    )


    expect(screen.getByAltText('Loading...')).toBeInTheDocument()
   

})

test("renders the anime info page",async  ()   => {

    render(

        <Router>
            <AnimeInfoPage animeId={5114} />
        </Router>
    )

    await waitFor(() => expect(screen.getByTestId('animosity-anime-page-Fullmetal Alchemist: Brotherhood')).toBeInTheDocument(), {timeout: 12000})

    await waitFor(() => expect(screen.getByTestId('animosity-anime-page-background-text')).toBeInTheDocument(), {timeout: 7000})
   
    await waitFor(() => expect(screen.getByTestId('animosity-anime-page-related-anime')).toBeInTheDocument(), {timeout: 7000})

    // await waitFor(() => expect(screen.getByTestId('animosity-anime-page-character-section')).toBeInTheDocument(), {timeout: 7000})

    // await waitFor(() => expect(screen.getByTestId('animosity-anime-page-character-section-carousel')).toBeInTheDocument(), {timeout: 7000})

    // await waitFor(() => expect(screen.getByTestId('animosity-anime-page-recommended-anime-section')).toBeInTheDocument(), {timeout: 7000})

    // await waitFor(() => expect(screen.getByTestId('animosity-anime-page-recommended-anime-carousel')).toBeInTheDocument(), {timeout: 7000})

})