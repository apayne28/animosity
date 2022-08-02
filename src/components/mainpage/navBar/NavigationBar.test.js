import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router} from "react-router-dom";
import NavigationBar from "./NavigationBar";

test("renders navigation bar", () => {

    render(

        <Router>
            <NavigationBar/>
        </Router>
    )

    expect(screen.getByTestId('animosity-navigation-bar')).toBeInTheDocument()
   

})