import { projectConstants } from '../actionTypes/project.constant';
import _ from 'lodash';

export const project = (
  state = {
    isLoading: false,
    errMess: null,
    list: []
  },
  action: any
) => {
  switch (action.type) {
    case projectConstants.GET_ALL_PROJECT_SUCCESS: {
      return { ...state, list: action.payload };
    }

    case projectConstants.PROJECT_CREATE_SUCCESS: {
      let project = action.payload;
      return { ...state, list: state.list.concat(project) };
    }

    case projectConstants.PROJECT_DELETE_SUCCESS: {
      let updated_list = _.filter(state.list, function(p) {
        return p.id != action.payload.id;
      });

      return { ...state, list: updated_list };
    }
    default:
      return state;
  }
};
