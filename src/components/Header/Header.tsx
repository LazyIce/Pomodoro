import * as React from "react";
import { Navbar } from "react-bootstrap";

import HeaderLinks from "./HeaderLinks";

interface Props {}
interface State {}

class Header extends React.Component<Props, State> {
    render() {
        return (
            <Navbar>
                <Navbar.Collapse>
                    <Navbar.Brand>
                        <a href="/dashboard">Dashboard</a>
                    </Navbar.Brand>
                </Navbar.Collapse>
                <Navbar.Collapse>
                    <HeaderLinks />
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;

