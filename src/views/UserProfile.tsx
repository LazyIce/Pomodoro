import * as React from "react";
import { Container, Row, Col, Button, Table, Modal } from "react-bootstrap";
import Card from "../components/Card/Card";
import { connect } from 'react-redux';

import UserList from "../components/Form/UserList"

function mapStateToProps(store: any) {
    return {
        states:{
            user_profiles : store.UserProfiles
        }
    };
}

function mapDispatchToProps(dispatch: any){
    return {
        actions: {
            create: (state: any)=>{dispatch({namespace: 'UserProfiles', type:'CREATE', value: {first_name: state.new_user_first_name, last_name: state.new_user_last_name, email: state.new_user_email} })},
            edit: (state: any)=>{dispatch({namespace: 'UserProfiles', type:'EDIT', value: {id: state.edit_id, first_name: state.edit_user_first_name, last_name: state.edit_user_last_name}})},
            delete: (id: number)=>{dispatch({namespace: 'UserProfiles', type:'DELETE', value: {id: id}})}   
        }
    }
}


interface Props {
    states: any,
    actions: any
}

// In page states only, like managing showing a modal and its content. Has nothing to do with redux's state
interface State {
    delete_show: boolean,
    delete_index: number,

    create_show: boolean,
    new_user_first_name: string,
    new_user_last_name: string,
    new_user_email: string,
    
    edit_show: boolean, 
    edit_index: number, 
    edit_id: number, 
    edit_user_first_name: string,
    edit_user_last_name: string
}

class UserProfile extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        
        this.DelModalShow = this.DelModalShow.bind(this);
        this.DelModalClose = this.DelModalClose.bind(this);
        this.DelModal = this.DelModal.bind(this);
        
        
        
        this.CreateModalShow = this.CreateModalShow.bind(this);
        this.CreateModalClose = this.CreateModalClose.bind(this);
        this.CreateModal = this.CreateModal.bind(this);
        
        this.EditModalClose = this.EditModalClose.bind(this);
        this.EditModalShow = this.EditModalShow.bind(this);
        this.EditModal = this.EditModal.bind(this);
        
        this.state={
            delete_show: false,
            delete_index: 0,
            
            create_show: false,
            new_user_first_name: '',
            new_user_last_name: '',
            new_user_email: '',

            edit_show: false, 
            edit_index: 0, 
            edit_id: 0, 
            edit_user_first_name: '',
            edit_user_last_name: ''
        };
    }

    // Delete modal
    DelModalClose() {
        this.setState({ delete_show: false });
    }
      
    DelModalShow() {
        this.setState({ delete_show: true });
    }

    DelButton(user: any, key: number){
        if(user.related_projects != 0){
            this.setState({delete_index: key});
            this.DelModalShow();
        }
        else{
            //otherwise delete directly.
            this.props.actions.delete(user.id);
        }
    }

    DelUser(user: any){
        if(this.state.delete_show){
            this.DelModalClose();
        }
        this.props.actions.delete(user.id);
    }

    DelModal(){
        if (this.state.delete_index < this.props.states.user_profiles.user_list.length) {
            return(
                <Modal show={this.state.delete_show} onHide={this.DelModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Confirmation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    First name: {this.props.states.user_profiles.user_list[this.state.delete_index].first_name}
                    <br/>
                    Last name: {this.props.states.user_profiles.user_list[this.state.delete_index].last_name}
                    <br/>
                    Email: {this.props.states.user_profiles.user_list[this.state.delete_index].email}
                    <br/>
                    This user has {this.props.states.user_profiles.user_list[this.state.delete_index].related_projects} related projects. Are you sure to delete the user?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.DelModalClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => this.DelUser(this.props.states.user_profiles.user_list[this.state.delete_index])}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>   
        )} else {
            return (
                <div />
            )
        }
    }

    CreateModalClose() {
        this.setState({ create_show: false });
    }
      
    CreateModalShow() {
        this.setState({ create_show: true });
    }

    CreateModal(){
            return(
                <Modal show={this.state.create_show} onHide={this.CreateModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Create a new user
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col> First name</Col>
                        <Col><input  value={this.state.new_user_first_name} onChange={(e:any)=>{this.setState({new_user_first_name: e.target.value});}}/></Col>
                    </Row>
                    <Row>
                        <Col> Last name</Col>
                        <Col><input  value={this.state.new_user_last_name} onChange={(e:any)=>{this.setState({new_user_last_name: e.target.value});}}/></Col>
                    </Row>
                    <Row>
                        <Col> Email</Col>
                        <Col><input  value={this.state.new_user_email} onChange={(e:any)=>{this.setState({new_user_email: e.target.value});}}/></Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.CreateModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={()=>{this.props.actions.create(this.state); this.CreateModalClose();}}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>   
        )
    }

    EditModalClose() {
        this.setState({ edit_show: false });
    }
      
    EditModalShow() {
        this.setState({ edit_show: true });
    }

    EditButton(user: any, key: number){
        this.setState({edit_index: key, edit_id: user.id, edit_user_first_name: user.first_name, edit_user_last_name: user.last_name});
        this.EditModalShow();
    }


    EditModal(){
        if (this.state.edit_index < this.props.states.user_profiles.user_list.length) {
            return(
                <Modal show={this.state.edit_show} onHide={this.EditModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit this user
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col> First name</Col>
                        <Col><input  value={this.state.edit_user_first_name} onChange={(e:any)=>{this.setState({edit_user_first_name: e.target.value});}}/></Col>
                    </Row>
                    <Row>
                        <Col> Last name</Col>
                        <Col><input  value={this.state.edit_user_last_name} onChange={(e:any)=>{this.setState({edit_user_last_name: e.target.value});}}/></Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.EditModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={()=>{this.props.actions.edit(this.state); this.EditModalClose();}}>
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal> 
        )} else {
            return (
                <div />
            )
        }
    }


    render(){
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <Card 
                                title="User Profiles"
                                category="Here is list of users for admins"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div>
                                        <Button className="col" variant="primary" onClick={()=>this.CreateModalShow()}>
                                            Create New User
                                        </Button>
                                        <Table striped hover>
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Email</th>
                                                    <th>Related Projects</th>
                                                    <th>operations</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.props.states.user_profiles.user_list.map((user: any, key: number)=>{
                                                        return(
                                                            <UserList 
                                                            user={user} key={key} 
                                                            delete_button={() => this.DelButton(user, key)}
                                                            edit_button={() => this.EditButton(user, key)} 
                                                            />
                                                        )})
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Container>
                <this.DelModal />
                <this.CreateModal />
                <this.EditModal />
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);