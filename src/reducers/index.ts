import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { project }from './project.reducer';
import { user } from './user.reducer'

const rootReducer = combineReducers({
    authentication,
    alert,
    project,
    user
});

export default rootReducer;