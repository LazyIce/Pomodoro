import { projectConstants } from "./../constants/project.constant";
import { projectService } from "./../services/project.service";

export const projectActions = {
    getAllProjects,
    addProject,
    deleteProject
}

function getAllProjects(userId: number) {
    return dispatch => {
        projectService.getUserAllProjects(userId)
            .then(
                res => {
                    dispatch(success(res.data));
                }
            )
    };

    function success(projects) { return { type: projectConstants.GET_ALL_PROJECT_SUCCESS, projects} }

}

function addProject(userId: number, projectName: string) {
    return dispatch =>  {
        projectService.addUserProject(userId, projectName)
            .then(
                res => dispatch(success(res.data))
            );
    };

    function success(project) { return { type: projectConstants.PROJECT_CREATE_SUCCESS, project} }
}

function deleteProject(userId: number, projectId: number) {
    return dispatch =>  {
        projectService.deleteUserProject(userId, projectId)
            .then(
                res => {
                    dispatch(success(res.data))
                }
            );
    };

    function success(project) { return { type: projectConstants.PROJECT_CREATE_SUCCESS, project} }
}
