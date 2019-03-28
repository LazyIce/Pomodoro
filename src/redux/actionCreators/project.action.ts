import { projectConstants } from '../actionTypes/project.constant';
import { projectService } from '../../services/project.service';

export const fetchAllProject = (userId: number) => async dispatch => {
   try {
      let res = await projectService.getUserAllProjects(userId);
      return dispatch(fetchAllProjectHelper(res.data));
   } catch (e) {
      console.log(e);
   }
};

export const fetchAllProjectHelper = projects => {
   return {
      type: projectConstants.GET_ALL_PROJECT_SUCCESS,
      payload: projects
   };
};

export const addProject = (userId: number, projectname: string) => async dispatch => {
   try {
      let res = await projectService.addUserProject(userId, projectname);
      return dispatch(addProjectHelper(res.data));
   } catch (e) {
      console.log(e);
   }
};

export const addProjectHelper = project => {
   return {
      type: projectConstants.PROJECT_CREATE_SUCCESS,
      payload: project
   };
};

export const deleteProject = (userId: number, projectId: number) => async dispatch => {
   try {
      let res = await projectService.deleteUserProject(userId, projectId);
      return dispatch(deleteProjectHelper(res.data));
   } catch (e) {
      console.log(e);
   }
};

export const deleteProjectHelper = project => {
   return {
      type: projectConstants.PROJECT_DELETE_SUCCESS,
      payload: project
   };
};
