import * as React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { userActions } from "./../../actions/user.action";
 
interface Props {
    type: string,
    loggingIn: boolean
}

interface State {
    username: string,
    password: string,
    submitted: boolean
}

class LoginForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        // this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: any) {
        const { name, value } = e.target;
        // this.setState({ [name]: value });
    }

    handleSubmit(e: any) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        // const { dispatch } = this.props;
        if (username && password) {
            // dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <Form onSubmit={ this.handleSubmit }>
                <Form.Group>
                    <Form.Label>{this.props.type == "admin" ? "Admin Name:" : "Email Address:"}</Form.Label>
                    <Form.Control type={this.props.type == "admin" ? "input" : "email"} placeholder={this.props.type == "admin" ? "Enter your admin name" : "Enter your email"} name="username" value={username} onChange={this.handleChange} required />
                    <Form.Control.Feedback>{submitted && !username && "Username is required"}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Passowrd" name="password" value={password} onChange={this.handleChange} required />
                    <Form.Control.Feedback>{submitted && !username && "Password is required"}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <Button variant="primary" type="submit" block>Submit</Button>
            </Form>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

export default connect(mapStateToProps)(LoginForm);