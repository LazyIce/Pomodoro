import { userConstants } from "./../constants/user.constants";

export function user(state = {}, action:any) {
    switch (action.type) {
		case userConstants.GET_ALL_USERS_SUCCESS: {
			return {
				items: action.users
			}
		}
		case userConstants.USER_CREATE_SUCCESS: {
			//@ts-ignore
			state.items.push(action.user)
		}
		case userConstants.USER_UPDATE_SUCCESS: {
			//@ts-ignore
			state.items.forEach(user => {
				if (user.id == action.user.id) {
					user.firstName = action.user.firstName;
					user.lastName = action.user.lastName;
				}
			})
			//@ts-ignore
			return {
				//@ts-ignore
				items: state.items
			}
		}
		case userConstants.USER_DELETE_SUCCESS: {
			//@ts-ignore
			const indexOfUserToDelete = state.items.forEach( (user, index) => {
				if (user.id == action.user.id) {
					return index;
				}
			})
			//@ts-ignore
			state.items.splice(indexOfUserToDelete, 1);
		}
		default:
			return state
	}
}
