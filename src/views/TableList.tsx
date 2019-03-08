import * as React from "react";
import { Container, Row, Col, Table, Tab } from "react-bootstrap";
import Card from "./../components/Card/Card";

interface Props {}
interface State {}

class TableList extends React.Component<Props, State> {
    render() {
        return (
            <div className="content"> 
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <Card 
                                title="User Table"
                                category="Here is the table for users"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Table striped hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>John</td>
                                                <td>john21@gatech.edu</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                }
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default TableList;