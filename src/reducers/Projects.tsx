// An toy state + reducer using redux
const namespace = "Projects"

// Initial state object
const initialState = {
    project_list: [{id: 0, project_name: "Example Project", number_sessions: 5, total_pomodoro: 10},
                  {id: 1, project_name: "Example Project 2", number_sessions: 2, total_pomodoro: 4},
                  {id: 3, project_name: "CS6301 Web1", number_sessions: 2, total_pomodoro: 0}],
    current_project: {}
};

export default function(state = initialState, action:any) {
  // See ReduxExample on how to use (dispatch) these actions
  // add naive namespace so we don't use wrong actions
  if (action.namespace === namespace) {
      // States can only be updated in immutable way: directly modifying the object won't trigger re-render
    state = Object.assign({}, state);
    switch (action.type) {
      case "CREATE": {  
          // Send a request to backend, push the new project into the list if succeed
          state.project_list.push({id: 4, project_name: action.value.new_project_name, number_sessions: 0, total_pomodoro: 0})
          return state;
      }

      // Edit not required in this user story
      // case "EDIT": {
      //   var index = -1
      //   for (var i = 0; i < state.project_list.length; i++) {
      //     if (state.project_list[i].id === action.value.id) {
      //       index = i
      //     }
      //   }
      //   if (index != -1) {
      //     state.project_list[index].number_sessions += 1;
      //   }
      //   return state;
      // }

      case "DELETE": {
        // Send th id of project to be deleted to backend; remove it from the list of succeed
        var index = -1
        for (var i = 0; i < state.project_list.length; i++) {
          if (state.project_list[i].id  === action.value.id) {
            index = i
          } 
        }
        if (index != -1){
          state.project_list.splice(index, 1)
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
