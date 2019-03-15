import { projectConstants } from "./../constants/project.constant";

const initialState = {
    project_list: [{id: 0, project_name: "Example Project", number_sessions: 5, total_pomodoro: 10},
                  {id: 1, project_name: "Example Project 2", number_sessions: 2, total_pomodoro: 4},
                  {id: 3, project_name: "CS6301 Web1", number_sessions: 2, total_pomodoro: 0}],
    current_project: {}
};

export function project(state = initialState, action:any) {
    state = Object.assign({}, state);
    switch (action.type) {
      case projectConstants.PROJECT_CREATE: {  
          state.project_list.push({id: 4, project_name: action.value.new_project_name, number_sessions: 0, total_pomodoro: 0})
          return state;
      }

      case projectConstants.PROJECT_DELETE: {
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
