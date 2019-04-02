import * as React from 'react';
import { Button } from 'react-bootstrap';

function ProjectList(props: any) {
   return (
      <tr>
         <td>{props.index + 1}</td>
         <td>{props.project.projectname}</td>
         <td>{props.project.report.sessions ? props.project.report.sessions.length : 0}</td>
         <td>{props.project.report.completedPomodoros ? props.project.report.completedPomodoros : 0}</td>
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

export default ProjectList;
