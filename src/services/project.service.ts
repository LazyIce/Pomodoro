// API calls under users/
import axios from 'axios';
import {apiConstants} from "../constants/api.constant";

export const projectService = {
    get_users_userId_projects,
    post_users_userId_projects,
    get_users_userId_projects_projectId,
    put_users_userId_projects_projectId,
    delete_users_userId_projects_projectId
};

function get_users_userId_projects(userId: number) { 
    // get projects for a user
    return axios.get(apiConstants.BASE_URL + '/users/' + userId + '/projects').then(res=> {
        return res;
    })
}
function post_users_userId_projects(userId: number, projectname: string) { 
    // create project for user
    return axios.post(apiConstants.BASE_URL + '/users/' + userId + '/projects', {
        id: 0,
        projectname: projectname,
        userId: userId
    }).then(res=> {
        return res;
    })
}
function get_users_userId_projects_projectId(userId: number, projectId: number) { 
    // Get project by ID for a given user
    return axios.get(apiConstants.BASE_URL + '/users/' + userId + '/projects/' + projectId).then(res=> {
        return res;
    })
}
function put_users_userId_projects_projectId(userId: number, projectId: number, projectname: string) { 
    // Get project by ID for a given user
    return axios.put(apiConstants.BASE_URL + '/users/' + userId + '/projects/' + projectId, {
        id: 0,
        projectname: projectname,
        userId: userId
    }).then(res=> {
        return res;
    })
}
function delete_users_userId_projects_projectId(userId: number, projectId: number) { 
    // Get project by ID for a given user
    return axios.delete(apiConstants.BASE_URL + '/users/' + userId + '/projects/' + projectId).then(res=> {
        return res;
    })
}