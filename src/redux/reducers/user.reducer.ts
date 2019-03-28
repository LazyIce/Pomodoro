import { userConstants } from "../actionTypes/user.constants";
import _ from 'lodash'


export const users = (state = {
	isLoading: false,
	errMess: null,
	list: []
}, action) => {
	switch (action.type) {
		case userConstants.GET_ALL_USERS_SUCCESS:
			return { ...state, list: action.payload }

		case userConstants.USER_CREATE_SUCCESS: {
			let user = action.payload
			return { ...state, list: state.list.concat(user) }
		}


		case userConstants.USER_UPDATE_SUCCESS: {
			let updated_list = _.map(state.list, (u) => {
				if (u.id == action.payload.id) {
					u.firstName = action.payload.firstName;
					u.lastName = action.payload.lastName;
				}
				return u
			})
			return { ...state, list: updated_list }

		}


		case userConstants.USER_DELETE_SUCCESS: {
			let updated_list = _.filter(state.list, function (u) {
				return u.id != action.payload.id
			});

			return { ...state, list: updated_list }

		}
		default:
			return state
	}
}

	// 
// export function user(state = {

// 	}, action: any) {
// 	state = Object.assign({}, state);
// 	switch (action.type) {
// 		case userConstants.GET_ALL_USERS_SUCCESS: {
// 			return {
// 				items: action.users
// 			}
// 		}
// 		case userConstants.USER_CREATE_SUCCESS: {
// 			//@ts-ignore
// 			state.items.push(action.user)
// 		}
// 		case userConstants.USER_UPDATE_SUCCESS: {
// 			//@ts-ignore
// 			state.items.forEach(user => {
// 				if (user.id == action.user.id) {
// 					user.firstName = action.user.firstName;
// 					user.lastName = action.user.lastName;
// 				}
// 			})
// 			//@ts-ignore
// 			return {
// 				//@ts-ignore
// 				items: state.items
// 			}
// 		}
// 		case userConstants.USER_DELETE_SUCCESS: {
// 			let indexOfUserToDelete = -1
// 			//@ts-ignore
// 			for (let i = 0; i < state.items.length; i++) {
// 				//@ts-ignore
// 				// console.log(state.items[i].id)
// 				//@ts-ignore
// 				if (state.items[i].id == action.user.id) {
// 					indexOfUserToDelete = i
// 					break
// 				}
// 			}

// 			if (indexOfUserToDelete != -1) {
// 				//@ts-ignore
// 				state.items.splice(indexOfUserToDelete, 1);
// 			}
// 			return state
// 		}
// 		default:
// 			return state
// 	}
// }
