import { userConstants } from '../actionTypes/user.constants';
import { userService } from '../../services/user.service';
import { projectService } from '../../services/project.service';

export const fetchAllUsers = function() {
  return async function(dispatch) {
    try {
      let res: any = await userService.getUsers();
      let userlist = res.data;
      let user_ids = userlist.map(user => user.id);
      for (const id of user_ids) {
        let p = await projectService.getUserAllProjects(id);
        userlist.forEach(function(user) {
          if (user.id == id) {
            user.related_projects = p.data;
          }
        });
      }
      return dispatch(addAllUsers(userlist));
    } catch (e) {
      console.log(e);
    }
  };
};

export const addAllUsers = (users: any) => ({
  type: userConstants.GET_ALL_USERS_SUCCESS,
  payload: users
});

export const postUser = ({ firstName, lastName, email }) => dispatch => {
  return userService
    .postUser(firstName, lastName, email)
    .then((res: any) => {
      console.log(firstName, lastName, email);
      dispatch(addUser(res.data));
    })
    .catch(error => {
      console.log(error.message);
    });
};

export const addUser = user => ({
  type: userConstants.USER_CREATE_SUCCESS,
  payload: user
});

export const putUser = ({ firstName, lastName, id }) => dispatch => {
  return userService
    .putUserByUserId(firstName, lastName, id)
    .then((res: any) => {
      dispatch(updateUser(res.data));
    })
    .catch(error => {
      console.log(error.message);
    });
};

export const updateUser = user => ({
  type: userConstants.USER_UPDATE_SUCCESS,
  payload: user
});

export const removeUser = userId => dispatch => {
  return userService
    .deleteUserByUserId(userId)
    .then((res: any) => {
      dispatch(deleteUser(res.data));
    })
    .catch(error => {
      console.log(error.message);
    });
};

export const deleteUser = user => ({
  type: userConstants.USER_DELETE_SUCCESS,
  payload: user
});
