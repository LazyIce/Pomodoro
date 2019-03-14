import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import { history } from "./helpers/history"; 
import { PrivateRoute } from "./routes/index";
import { store } from "./helpers/store";
import Bootstrap from "./layouts/Bootstrap/Bootstrap";
import Dashboard from "./layouts/Dashboard/Dashboard";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/index.scss";
import "./assets/css/pe-icon-7-stroke.css";

render(
    <Provider store={store}>
        <Router history={history}>
                <div>
                    <PrivateRoute exact path="/" component={Dashboard} />
                    <Route path="/login" component={Bootstrap} />
                </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);