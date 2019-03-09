import * as React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

import HeaderLinks from "./HeaderLinks";

interface Props {}
interface State {}

class Header extends React.Component<Props, State> {
    render() {
        return (
            <Navbar>
                <Container fluid>
                    <Navbar.Brand>
                        Dashboard
                    </Navbar.Brand>
                    <Nav>
                        <HeaderLinks />
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

export default Header;

