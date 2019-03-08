import * as React from "react";
import { Navbar } from "react-bootstrap";

import HeaderLinks from "./HeaderLinks";

interface Props {}

interface State {
    sidebarExists: boolean
}

class Header extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sidebarExists: false
        }
        this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    }

    mobileSidebarToggle(e: any) {
        if (this.state.sidebarExists === false) {
            this.setState({
                sidebarExists: true
            });
        }
        e.preventDefault();
        document.documentElement.classList.toggle("nav-open");
        let node = document.createElement("div");
        node.id = "bodyClick";
        node.onclick = () => {
            node.parentElement.removeChild(node);
            document.documentElement.classList.toggle("nav-opne");
        }
        document.body.appendChild(node);
    }

    render() {
        return (
            <Navbar>
                <Navbar.Collapse>
                    <Navbar.Brand>
                        <a href="#pablo">Dashboard</a>
                    </Navbar.Brand>
                    <Navbar.Toggle onClick={this.mobileSidebarToggle} />
                </Navbar.Collapse>
                <Navbar.Collapse>
                    <HeaderLinks />
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;

