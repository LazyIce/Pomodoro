// API calls under users/
import axios from 'axios';
import { BASE_URL } from "../shared/baseUrl";

export const projectService = {
    getUserAllProjects,
    addUserProject,
    getUserProject,
    putUserProject,
    deleteUserProject,
    getProjectReport
};

function getUserAllProjects(userId: number) {
    // get projects for a user
    return axios.get(BASE_URL + '/users/' + userId + '/projects').then(res => {
        return res;
    })
}
function addUserProject(userId: number, projectname: string) {
    // create project for user
    return axios.post(BASE_URL + '/users/' + userId + '/projects', {
        id: 0,
        projectname: projectname,
        userId: userId
    }).then(res => {
        return res;
    })
}
function getUserProject(userId: number, projectId: number) {
    // Get project by ID for a given user
    return axios.get(BASE_URL + '/users/' + userId + '/projects/' + projectId).then(res => {
        return res;
    })
}
function putUserProject(userId: number, projectId: number, projectname: string) {
    // Get project by ID for a given user
    return axios.put(BASE_URL + '/users/' + userId + '/projects/' + projectId, {
        id: 0,
        projectname: projectname,
        userId: userId
    }).then(res => {
        return res;
    })
}
function deleteUserProject(userId: number, projectId: number) {
    // Get project by ID for a given user
    return axios.delete(BASE_URL + '/users/' + userId + '/projects/' + projectId).then(res => {
        return res;
    })
}

function getProjectReport(userId: number, projectId: number) {
    // Get project report by userID and projectID 
    return axios.get(BASE_URL + '/users/' + userId + '/projects/' + projectId + '/report').then(res => {
        return res; 
    })
}