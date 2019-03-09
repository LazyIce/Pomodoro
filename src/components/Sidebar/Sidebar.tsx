import * as React from "react";
import { NavLink } from "react-router-dom";
import HeaderLinks from "./../Header/HeaderLinks";

import dashboardRoutes from "./../../routes/dashboard";

import logo from "./../../assets/img/logo.png";

interface Props {
    location: any
}
interface State {
    width: number
}

class Sidebar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            width: window.innerWidth
        }
    }

    activeRoute(routeName: string) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    updateDimensions() {
        this.setState({
            width: window.innerWidth
        });
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        return (
            <div id="sidebar" className="sidebar" data-color="black">
                <div className="logo">
                    <a href="#" className="simple-text logo-mini">
                        <div className="logo-img">
                            <img src={logo} alt="logo_image" />
                        </div>
                    </a>
                    <a href="/dashboard" className="simple-text logo-normal">
                        Pomodoro
                    </a> 
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        {this.state.width <= 991 ? <HeaderLinks /> : null}
                        {dashboardRoutes.map((prop, key) => {
                            if (!prop.redirect)
                                return (
                                    <li className={this.activeRoute(prop.path)} key={key}>
                                        <NavLink to={prop.path} className="nav-link" activeClassName="active">
                                            <i className={prop.icon} />
                                            <p>{prop.name}</p>
                                        </NavLink>
                                    </li>
                                )
                            return null;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;
