import * as React from "react";
import { Button } from "react-bootstrap";

function ProjectList(props: any){
    return(
        <tr key={props.project.id}>
            <td>{props.project.id}</td>
            <td>{props.project.project_name}</td>
            <td>{props.project.number_sessions}</td>
            <td>{props.project.total_pomodoro}</td>
            <td>
                <Button  onClick={props.delete_button} variant="secondary">
                    Delete
                </Button>
                {/* <Button onClick={props.edit_button} variant="secondary">
                    edit
                </Button> */}
            </td>
        </tr>
    );
}

export default ProjectList;