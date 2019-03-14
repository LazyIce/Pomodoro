import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import Projects from './Projects';
import UserProfiles from './UserProfiles'

const rootReducer = combineReducers({
    authentication,
    Projects,
    UserProfiles
});

export default rootReducer;