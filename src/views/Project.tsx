import * as React from "react";
import { Container, Row, Col, Button, Table, Modal } from "react-bootstrap";
import Card from "../components/Card/Card";
import { connect } from 'react-redux';
import { projectActions } from './../actions/project.action';

import ProjectList from "../components/List/ProjectList"

interface Props {
    project,
    dispatch
}

// In page states only, like managing showing a modal and its content. Has nothing to do with redux's state
interface State {
    delete_show: boolean,
    delete_index: number,
    create_show: boolean,
    new_project_name: string
}

class Project extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        
        this.DelModalShow = this.DelModalShow.bind(this);
        this.DelModalClose = this.DelModalClose.bind(this);
        this.DelModal = this.DelModal.bind(this);
        
        this.CreateModalShow = this.CreateModalShow.bind(this);
        this.CreateModalClose = this.CreateModalClose.bind(this);
        this.CreateModal = this.CreateModal.bind(this);
        
        this.state={
            delete_show: false,
            delete_index: 0,
            
            create_show: false,
            new_project_name: ''
        };
    }

    // Delete modal
    DelModalClose() {
        this.setState({ delete_show: false });
    }
      
    DelModalShow() {
        this.setState({ delete_show: true });
    }

    DelButton(project: any, key: number){
        //Check if there is pomodoro associated with the project
        //console.log(project.total_pomodoro);
        if(project.total_pomodoro != 0){
            //if there is pomodoro, popup the confirmation for user
            this.setState({delete_index: key});
            this.DelModalShow();
        }
        else{
            //otherwise delete directly.
            this.props.dispatch(projectActions.deleteProject(Number(localStorage.getItem("id")), project.id));
        }
    }

    DelProject(project: any){
        //Delete the projects
        if(this.state.delete_show){
            this.DelModalClose();
        }
        this.props.dispatch(projectActions.deleteProject(Number(localStorage.getItem("id")), project.id))
    }

    DelModal(){
        // console.log("Hi!")
        // console.log(this.state.delete_index)
        // console.log(this.props.states.projects.project_list.length)
        if (this.state.delete_index < this.props.project.items.length) {
            return(
                <Modal show={this.state.delete_show} onHide={this.DelModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Confirmation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This project {this.props.project.items[this.state.delete_index].projectName} has a pomodoro associate with it. Are you sure to delete the project?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.DelModalClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => this.DelProject(this.props.project.items[this.state.delete_index])}>
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
                        Create a new project
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col> Projoect Name</Col>
                        <Col><input  value={this.state.new_project_name} onChange={(e:any)=>{this.setState({new_project_name: e.target.value});}}/></Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.CreateModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={()=>{this.props.dispatch(projectActions.addProject(Number(localStorage.getItem("id")), this.state.new_project_name)); this.CreateModalClose();}}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>   
        )
    }

    render(){
        //@ts-ignore
        const { project } = this.props;
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <Card 
                                title="Projects"
                                category="Here are all your projects"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div>
                                        <Button className="col" variant="primary" onClick={()=>this.CreateModalShow()}>
                                            Create New Project
                                        </Button>
                                        <Table striped hover>
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Project Name</th>
                                                    <th>Session Number</th>
                                                    <th>Total Pomodoros</th>
                                                    <th>operations</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    project.items &&   
                                                    project.items.map((project: any, key: number)=>{
                                                        return(
                                                            <ProjectList 
                                                            project={project} key={key} 
                                                            delete_button={() => this.DelButton(project, key)}
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
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    const { project } = state;
    return {
        project
    };
}

export default connect(mapStateToProps)(Project);