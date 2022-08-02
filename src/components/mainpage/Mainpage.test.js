import { getByTestId, render, screen } from "@testing-library/react";
import { MemoryRouter as Router} from "react-router-dom";
import Mainpage from "./Mainpage";


test('renders mainpage', () => {

    render(
        <Router>
            <Mainpage />
        </Router>
    )

    expect(screen.getByTestId("animosity-homepage-carousel")).toBeInTheDocument()

})