import * as React from 'react';
import { render } from 'react-dom';

import { BrowserRouter, Route, Switch} from 'react-router-dom';

import indexRoutes from './routes/index'

render(
    <BrowserRouter>
        <Switch>
            {indexRoutes.map((prop, key) => {
                return <Route to={prop.path} component={prop.component} key={key} />
            })}
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'),
);