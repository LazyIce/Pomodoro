import { projectConstants } from "./../constants/project.constant";

export function project(state = {}, action:any) {
    switch (action.type) {
		case projectConstants.GET_ALL_PROJECT_SUCCESS: {
			return {
				items: action.projects
			}
		}
		case projectConstants.PROJECT_CREATE_SUCCESS: {
			//@ts-ignore
			state.items.push(action.project)
		}
		case projectConstants.PROJECT_DELETE_SUCCESS: {
			//@ts-ignore
			const indexOfProjectToDelete = state.items.forEach( (project, index) => {
				if (project.id == action.project.id) {
					return index;
				}
			})
			//@ts-ignore
			state.items.splice(indexOfProjectToDelete, 1);
		}
		default:
			return state
	}
}
