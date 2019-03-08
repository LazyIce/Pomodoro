import * as React from "react"; 
import { Container } from "react-bootstrap";

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <Container fluid>
                    <nav className="pull-left">
                        <ul>
                            <li>
                                <a href="/pablo">Home</a>
                            </li>
                            <li>
                                <a href="/pablo">Company</a>
                            </li>
                            <li>
                                <a href="/pablo">Portfolio</a>
                            </li>
                            <li>
                                <a href="/pablo">Blog</a>
                            </li>
                        </ul>
                    </nav>
                    <p className="copyright pull-right">
                        &copy; {new Date().getFullYear()}{" "}
                        <a href="#">Creative Time</a>, made with love
                    </p>
                </Container>
            </footer>
        )
    }
}

export default Footer;