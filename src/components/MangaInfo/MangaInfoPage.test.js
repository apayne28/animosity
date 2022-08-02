import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter as Router} from "react-router-dom";
import MangaInfoPage from "./MangaInfoPage";


jest.setTimeout(12000)



test("renders loading screen",async  ()   => {

    render(

        <Router>
            <MangaInfoPage MangaId={2} />
        </Router>
    )


    expect(screen.getByAltText('Loading...')).toBeInTheDocument()
   

})

test("renders the manga info page",async  ()   => {

    render(

        <Router>
            <MangaInfoPage MangaId={2} />
        </Router>
    )

    await waitFor(() => expect(screen.getByTestId('animosity-manga-page-Beserk')).toBeInTheDocument(), {timeout: 12000})

    await waitFor(() => expect(screen.getByTestId('animosity-manga-page-background-text')).toBeInTheDocument(), {timeout: 7000})
   
    await waitFor(() => expect(screen.getByTestId('animosity-manga-page-related-manga')).toBeInTheDocument(), {timeout: 7000})

    // await waitFor(() => expect(screen.getByTestId('animosity-manga-page-character-section')).toBeInTheDocument(), {timeout: 7000})

    // await waitFor(() => expect(screen.getByTestId('animosity-manga-page-character-section-carousel')).toBeInTheDocument(), {timeout: 7000})

    // await waitFor(() => expect(screen.getByTestId('animosity-manga-page-recommended-manga-section')).toBeInTheDocument(), {timeout: 7000})

    // await waitFor(() => expect(screen.getByTestId('animosity-manga-page-recommended-manga-carousel')).toBeInTheDocument(), {timeout: 7000})

})