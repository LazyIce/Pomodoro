import * as React from 'react';
import { Button } from 'react-bootstrap';

function ProjectList(props: any) {
   return (
      <tr>
         <td>{props.index + 1}</td>
         <td>{props.project.projectname}</td>

         {/* <td>{props.project.number_sessions}</td>
            <td>{props.project.total_pomodoro}</td> */}
         <td>{props.project.sessions ? props.project.sessions.length : 0}</td>
         <td>{getPomodoroCount(props.project.sessions)}</td>
         <td>
            <Button id={"edit_"+props.index} onClick={props.edit_button} variant="warning">
               Edit
            </Button>
            <Button id={"delete_"+props.index} onClick={props.delete_button} variant="secondary">
               Delete
            </Button>
         </td>
      </tr>
   );
}

function getPomodoroCount(sessions) {
   let counter = 0;
   if (sessions) {
      sessions.forEach(session => {
         if (session.counter) {
            counter = counter + session.counter;
         }
      });
   }
   return counter;
}

export default ProjectList;
