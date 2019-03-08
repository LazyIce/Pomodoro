import * as React from "react";
import { Nav } from "react-bootstrap";

class HeaderLinks extends React.Component {
    render() {
        return (
            <Nav>
                <Nav.Item>
                    <Nav.Link>
                        Home
                    </Nav.Link>
                    <Nav.Link>
                        HAHA
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }
}

export default HeaderLinks;