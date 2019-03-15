// API calls under users/
import axios from 'axios';
import {apiConstants} from "../constants/api.constant";

export const projectService = {
    getUserAllProjects,
    addUserProject,
    getUserProject,
    putUserProject,
    deleteUserProject
};

function getUserAllProjects(userId: number) { 
    // get projects for a user
    return axios.get(apiConstants.BASE_URL + '/users/' + userId + '/projects').then(res=> {
        return res;
    })
}
function addUserProject(userId: number, projectname: string) { 
    // create project for user
    return axios.post(apiConstants.BASE_URL + '/users/' + userId + '/projects', {
        id: 0,
        projectname: projectname,
        userId: userId
    }).then(res=> {
        return res;
    })
}
function getUserProject(userId: number, projectId: number) { 
    // Get project by ID for a given user
    return axios.get(apiConstants.BASE_URL + '/users/' + userId + '/projects/' + projectId).then(res=> {
        return res;
    })
}
function putUserProject(userId: number, projectId: number, projectname: string) { 
    // Get project by ID for a given user
    return axios.put(apiConstants.BASE_URL + '/users/' + userId + '/projects/' + projectId, {
        id: 0,
        projectname: projectname,
        userId: userId
    }).then(res=> {
        return res;
    })
}
function deleteUserProject(userId: number, projectId: number) { 
    // Get project by ID for a given user
    return axios.delete(apiConstants.BASE_URL + '/users/' + userId + '/projects/' + projectId).then(res=> {
        return res;
    })
}