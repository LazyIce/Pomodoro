import * as React from "react";
import { Nav } from "react-bootstrap";

class HeaderLinks extends React.Component {
    render() {
        return (
            <div>
                <Nav className="justify-content-end">
                    <Nav.Item>
                        <Nav.Link href="#">Account</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#">Logout</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    }
}

export default HeaderLinks;