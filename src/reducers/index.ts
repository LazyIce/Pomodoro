import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import Projects from './Projects';
import UserProfiles from './UserProfiles'

const rootReducer = combineReducers({
    authentication,
    alert,
    Projects,
    UserProfiles
});

export default rootReducer;