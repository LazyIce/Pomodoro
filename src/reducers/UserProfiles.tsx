// An toy state + reducer using redux
const namespace = "UserProfiles"

// Initial state object
const initialState = {
    user_list: [{id: 0, first_name: "Bat", last_name: "Man", email: "la;sdkjflasjf", related_projects: 5},
                  {id: 1, first_name: "Naru", last_name: "To", email: "laskdjflaskjdf", related_projects: 0}]
};

export default function(state = initialState, action:any) {
  // See ReduxExample on how to use (dispatch) these actions
  // add naive namespace so we don't use wrong actions
  if (action.namespace === namespace) {
      // States can only be updated in immutable way: directly modifying the object won't trigger re-render
    state = Object.assign({}, state);
    switch (action.type) {
      case "CREATE": {  
          // Send a request to backend, push the new user into the list if succeed
          state.user_list.push({id: 4, first_name: action.value.first_name, last_name: action.value.last_name, email: action.value.email, related_projects: 0})
          return state;
      }

      case "EDIT": {
        // Send a request to backend, change the content of this list if succeed
        console.log(action.value)
        var index = -1
        for (var i = 0; i < state.user_list.length; i++) {
          if (state.user_list[i].id === action.value.id) {
            index = i
          }
        }
        if (index != -1) {
          state.user_list[index].first_name = action.value.first_name;
          state.user_list[index].last_name = action.value.last_name;
        }
        return state;
      }

      case "DELETE": {
        // Send th id of project to be deleted to backend; remove it from the list of succeed
        var index = -1
        for (var i = 0; i < state.user_list.length; i++) {
          if (state.user_list[i].id  === action.value.id) {
            index = i
          } 
        }
        if (index != -1){
          state.user_list.splice(index, 1)
        }
        return state;
      }

      default:
        return state;
    }  
  } 
  else {
    return state
  }
}
