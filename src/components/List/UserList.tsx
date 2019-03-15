import * as React from "react";
import { Button } from "react-bootstrap";

function UserList(props: any){
    return(
        <tr key={props.user.id}>
            <td>{props.user.id}</td>
            <td>{props.user.firstName}</td>
            <td>{props.user.lastName}</td>
            <td>{props.user.email}</td>
            <td>{props.user.projects.length}</td>
            <td>
                <Button onClick={props.edit_button} variant="warning">
                    edit
                </Button>
                <Button  onClick={props.delete_button} variant="secondary">
                    Delete
                </Button>
            </td>
        </tr>
    );
}

export default UserList;