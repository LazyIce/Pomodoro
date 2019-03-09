import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "./../../components/Header/Header";
import Footer from "./../../components/Footer/Footer";
import Sidebar from "./../../components/Sidebar/Sidebar";

import dashboardRoutes from "./../../routes/dashboard";

interface Props {
    location: any
}

interface State {}

class Dashboard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                <Sidebar {...this.props} />
                <div id="main-panel" className="main-panel" ref="mainPanel">
                    <Header {...this.props} />
                    <Switch>
                        {dashboardRoutes.map((prop, key) => {
                            if (prop.redirect)
                                return <Redirect from={prop.path} to={prop.to} key={key} />;
                            return (
                                <Route path={prop.path} component={prop.component} key={key} />
                            );
                        })}
                    </Switch>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Dashboard;