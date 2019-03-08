import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";

interface Props {}

interface State {}

class Dashboard extends React.Component<Props, State> {
    render() {
        return (
            <div className="content">
                <Container fluid>
                    <Row>
                        <Col lg={3} sm={6}>
                            Hello world!
                        </Col>
                        <Col lg={3} sm={6}>
                            Hello world!
                        </Col>
                        <Col lg={3} sm={6}>
                            Hello world!
                        </Col>
                        <Col lg={3} sm={6}>
                            Hello world!
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Dashboard;