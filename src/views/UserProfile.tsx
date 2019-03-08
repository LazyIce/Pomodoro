import * as React from "react";
import { Container, Row, Col, FormGroup, FormControl } from "react-bootstrap";

interface Props {}
interface State {}

class UserProfile extends React.Component<Props, State> {
    render() {
        return (
            <div className="content">
                <Container fluid>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                            <FormControl
                                rows={10}
                                as="textarea"
                            />
                        </FormGroup>
                      </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default UserProfile;