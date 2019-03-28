import * as React from 'react';
import { Button } from 'react-bootstrap';

function UserList(props: any) {
  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>{props.user.firstName}</td>
      <td>{props.user.lastName}</td>
      <td>{props.user.email}</td>
      <td>
        {props.user.related_projects ? props.user.related_projects.length : 0}
      </td>
      <td>
        <Button onClick={props.edit_button} variant="warning">
          edit
        </Button>
        <Button onClick={props.delete_button} variant="secondary">
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default UserList;
