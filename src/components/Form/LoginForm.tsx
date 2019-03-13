import * as React from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {
    type: string,
}
interface State {}

class LoginForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    handleSubmit(e: any) {
        e.preventDefault();
        
        if (this.props.type == "admin")
            this.props.history.push("/admin");
        else
            this.props.history.push("/dashboard")
    }

    render() {
        return (
            <Form onSubmit={ (e: any) => this.handleSubmit(e) }>
                <Form.Group>
                    <Form.Label>{this.props.type == "admin" ? "Admin Name:" : "Email Address:"}</Form.Label>
                    <Form.Control type={this.props.type == "admin" ? "input" : "email"} placeholder={this.props.type == "admin" ? "Enter your admin name" : "Enter your email"} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Passowrd" />
                </Form.Group>
                <Form.Group>
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <Button variant="primary" type="submit" block>Submit</Button>
            </Form>
        );
    }
}

export default withRouter(LoginForm);