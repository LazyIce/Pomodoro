import { userConstants } from "./../constants/user.constants";

export function user(state = {}, action:any) {
    switch (action.type) {
		case userConstants.GET_ALL_USERS_SUCCESS: {
			return {
				items: action.users
			}
		}
		case userConstants.USER_UPDATE_SUCCESS: {
			return [
				//@ts-ignore
				...state.filter(user => user.id !== action.user.id),
				Object.assign({}, action.user)
			]
		}
		case userConstants.USER_CREATE_SUCCESS: {
			//@ts-ignore
			state.items.push(action.user)
		}
		case userConstants.USER_DELETE_SUCCESS: {
			
			//@ts-ignore
			const indexOfUserToDelete = state.items.forEach( (user, index) => {
				if (user.id == action.user.id) {
					console.log(index);
					return index;
				}
			})
			console.log(indexOfUserToDelete)
			//@ts-ignore
			state.items.splice(indexOfUserToDelete, 1);
		}
		default:
			return state
	}
}
