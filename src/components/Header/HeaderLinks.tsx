import * as React from "react";
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { userActions } from "../../actions/authentication.action";

class HeaderLinks extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (e: any) {
        e.preventDefault();
        //@ts-ignore
        const { dispatch } = this.props;
        dispatch(userActions.logout());
    }

    render() {
        return (
            <div>
                <Nav className="justify-content-end">
                    <Nav.Item>
                        <Nav.Link href="#">{localStorage.getItem("user")}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#" onClick={this.handleClick}>Logout</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

export default connect(mapStateToProps)(HeaderLinks);