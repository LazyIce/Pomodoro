import * as React from 'react';
import { Container, Row, Col, Button, Table, Modal } from 'react-bootstrap';
import Card from '../components/Card/Card';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { fetchAllProjects, addProject, putProject, deleteProject, clearErrorMessage} from '../redux/actionCreators/project.action';

import ProjectList from '../components/List/ProjectList';

const mapStateToProps = (state: any) => {
   return {
      projectlist: state.project.list,
      projectErrMess: state.project.errMess
   };
};

const mapDispatchToProps = dispatch => ({
   fetchAllProjects: userId => {
      dispatch(fetchAllProjects(userId));
   },
   addProject: (userId, projectname) => {
      dispatch(addProject(userId, projectname));
   },
   putProject: ({projectname, userId, projectId}) => {
      dispatch(putProject({projectname, userId, projectId}));
   },
   deleteProject: (userId, projectId) => {
      dispatch(deleteProject(userId, projectId));
   },
   clearErrorMessage: () => {
      dispatch(clearErrorMessage())
   }
});

interface Props {
   projectlist: any;
   fetchAllProjects: any;
   addProject: any;
   putProject: any;
   deleteProject: any;
   clearErrorMessage: any;
   projectErrMess: any;
}

// In page states only, like managing showing a modal and its content. Has nothing to do with redux's state
interface State {
   delete_show: boolean;
   delete_index: number;
   create_show: boolean;
   new_project_name: string;

   edit_show: boolean;
   edit_index: number;
   edit_user_id: number,
   edit_project_id: number,
   edit_project_name: string;

   currentPage: number;
   pageLimit: number;
   droplist: boolean;
   keyword: string;
}

class Project extends React.Component<Props, State> {
   constructor(props: Props) {
      super(props);

      this.ErrModalClose = this.ErrModalClose.bind(this);
      this.ErrModal = this.ErrModal.bind(this);

      this.DelModalShow = this.DelModalShow.bind(this);
      this.DelModalClose = this.DelModalClose.bind(this);
      this.DelModal = this.DelModal.bind(this);

      this.CreateModalShow = this.CreateModalShow.bind(this);
      this.CreateModalClose = this.CreateModalClose.bind(this);
      this.CreateModal = this.CreateModal.bind(this);

      this.EditModalShow = this.EditModalShow.bind(this);
      this.EditModalClose = this.EditModalClose.bind(this);
      this.EditModal = this.EditModal.bind(this);

      this.onPageChange = this.onPageChange.bind(this);
      this.clickDropdown = this.clickDropdown.bind(this);
      this.clickOption = this.clickOption.bind(this);
      this.handleTextUpdate = this.handleTextUpdate.bind(this);

      this.state = {
         delete_show: false,
         delete_index: 0,

         create_show: false,
         new_project_name: '',

         edit_show: false,
         edit_index: 0,
         edit_user_id: 0,
         edit_project_id: 0,
         edit_project_name: '',

         currentPage: 0,
         pageLimit: 5,
         droplist: false,
         keyword: ""
      };
   }

   componentDidMount() {
      this.props.fetchAllProjects(Number(localStorage.getItem('id')));
   }

   // Error modal
   ErrModalClose() {
      this.props.clearErrorMessage();
   }

   ErrModal() {
      return (
         <Modal id="error_modal" show={this.props.projectErrMess != null} onHide={this.ErrModalClose}>
            <Modal.Header closeButton>
               <Modal.Title>Error Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {this.props.projectErrMess}
            </Modal.Body>
            <Modal.Footer>
               <Button
                  variant="primary"
                  onClick={() => this.ErrModalClose()}
               >
                  OK
               </Button>
            </Modal.Footer>
         </Modal>
      );
   }

   // Delete modal
   DelModalClose() {
      this.setState({ delete_show: false });
   }

   DelModalShow() {
      this.setState({ delete_show: true });
   }

   DelButton(project: any, key: number) {
      
      if (project.report.sessions && project.report.sessions.length != 0) {
         //if there is pomodoro, popup the confirmation for user
         this.setState({ delete_index: key });
         this.DelModalShow();
      } else {
      this.props.deleteProject(project.userId, project.id);
      }
   }

   DelProject(project: any) {
      //Delete the projects
      if (this.state.delete_show) {
         this.DelModalClose();
      }
      this.props.deleteProject(project.userId, project.id);
   }

   DelModal() {
      if (this.props.projectlist && this.state.delete_index < this.props.projectlist.length) {
         return (
            <Modal show={this.state.delete_show} onHide={this.DelModalClose}>
               <Modal.Header closeButton>
                  <Modal.Title>Confirmation</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  This project {this.props.projectlist[this.state.delete_index].projectname} has sessions
                  associate with it. Are you sure to delete the project?
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={this.DelModalClose}>
                     No
                  </Button>
                  <Button
                     variant="primary"
                     onClick={() => this.DelProject(this.props.projectlist[this.state.delete_index])}
                  >
                     Yes
                  </Button>
               </Modal.Footer>
            </Modal>
         );
      } else {
         return <div />;
      }
   }

   CreateModalClose() {
      this.setState({ create_show: false });
   }

   CreateModalShow() {
      this.setState({ create_show: true });
   }

   CreateModal() {
      return (
         <Modal id="create_project_modal" show={this.state.create_show} onHide={this.CreateModalClose}>
            <Modal.Header closeButton>
               <Modal.Title>Create a new project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Row>
                  <Col> Projoect Name</Col>
                  <Col>
                     <input
                        id="create_project_name"
                        value={this.state.new_project_name}
                        onChange={(e: any) => {
                           this.setState({ new_project_name: e.target.value });
                        }}
                     />
                  </Col>
               </Row>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={this.CreateModalClose}>
                  Cancel
               </Button>
               <Button
                  id="confirm_create_project_button"
                  variant="primary"
                  onClick={() => {
                     this.props.addProject(Number(localStorage.getItem('id')), this.state.new_project_name);
                     this.CreateModalClose();
                     this.setState({ new_project_name: '' });
                  }}
               >
                  Create
               </Button>
            </Modal.Footer>
         </Modal>
      );
   }

   EditModalClose() {
      this.setState({ edit_show: false });
   }

   EditModalShow() {
      this.setState({ edit_show: true });
   }

   EditButton(project: any, key: number) {
      this.setState({
         edit_index: key,
         edit_user_id: project.userId,
         edit_project_id: project.id,
         edit_project_name: project.projectname
      });
      this.EditModalShow();
   }

   EditModal() {
      if (this.props.projectlist && this.state.delete_index < this.props.projectlist.length) {
         return (
            <Modal id="edit_modal" show={this.state.edit_show} onHide={this.EditModalClose}>
               <Modal.Header closeButton>
                  <Modal.Title>Edit this project</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Row>
                     <Col>Project Name</Col>
                     <Col>
                        <input
                           id="edit_project_name"
                           value={this.state.edit_project_name}
                           onChange={(e: any) => {
                              this.setState({ edit_project_name: e.target.value });
                           }}
                        />
                     </Col>
                  </Row>
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={this.EditModalClose}>
                     Cancel
                  </Button>
                  <Button
                     id="confirm_edit"
                     variant="primary"
                     onClick={() => {
                        this.props.putProject({
                           projectname: this.state.edit_project_name,
                           userId: this.state.edit_user_id,
                           projectId: this.state.edit_project_id
                        });
                        this.EditModalClose();
                     }}
                  >
                     Edit
                  </Button>
               </Modal.Footer>
            </Modal>
         );
      } else {
         return <div />;
      }
   }

   onPageChange (data) {
      let selected = data.selected;
      this.setState({
         currentPage: selected
      });
   }

   clickDropdown() {
      const {droplist } = this.state;
      this.setState({
         droplist: !droplist
      });
   }

   clickOption(e) {
      let pageLimit = e.target.text;
      this.setState({
         pageLimit: pageLimit
      });
   }

   handleTextUpdate(e) {
      let keyword = e.target.value;
      this.setState({
         keyword: keyword
      });
   }

   render() {
      return (
         <div className="content">
            <Container fluid>
               <Row>
                  <Col md={12}>
                     <Card
                        title="Projects Table"
                        icon="pe-7s-graph3"
                        hCenter={true}
                        ctTableFullWidth
                        ctTableResponsive
                        content={
                           <div className="card-content">
                              <div className="widget-row">
                                 <div className="input-container col-md-4">
                                    <input type="text" placeholder="Search on name..." id="general-search" onChange={this.handleTextUpdate}/>
                                    <span className="input-icon">
                                       <span><i className="pe-7s-search" /></span>
                                    </span>
                                 </div>
                                 <div className="btn-container col-md-3">
                                    <Button
                                       id="create_project_button"
                                       className="col"
                                       variant="primary"
                                       onClick={() => this.CreateModalShow()}
                                    >
                                       Create New Project
                                    </Button>
                                 </div>
                              </div>
                              <div className="table-container">
                                 <Table striped hover>
                                    <thead>
                                       <tr>
                                          <th>Id</th>
                                          <th>Project Name</th>
                                          <th>Sessions</th>
                                          <th>Total Pomodoros</th>
                                          <th>Operations</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {
                                          this.props.projectlist.filter(project => {return project.projectname.includes(this.state.keyword)})
                                          .slice(this.state.currentPage * this.state.pageLimit, this.state.currentPage*this.state.pageLimit + this.state.pageLimit)
                                          .map((project: any, index: number) => {
                                             return (
                                                <ProjectList
                                                   project={project}
                                                   key={index}
                                                   index={index}
                                                   delete_button={() => this.DelButton(project, index)}
                                                   edit_button={() => this.EditButton(project, index)}
                                                />
                                             );
                                       })}
                                    </tbody>
                                 </Table>
                              </div>
                              <div className="pagination-container">
                                 <ReactPaginate
                                    previousLabel={'previous'}
                                    nextLabel={'next'}
                                    breakLabel={'...'}
                                    pageCount={Math.ceil(this.props.projectlist.filter(project => {return project.projectname.includes(this.state.keyword)}).length / this.state.pageLimit)}
                                    initialPage={0}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={3}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                    onPageChange={this.onPageChange}
                                 />
                                 <div className="page-info">
                                       <div className="page-dropdown" onClick={this.clickDropdown}>
                                          <button className="dropdown-toggle">
                                             <div className="filter-option">
                                                <div className="filter-option-inner">
                                                   <div className="filter-option-inner-inner">{this.state.pageLimit}</div>
                                                </div>
                                             </div>
                                          </button>
                                          <div className={this.state.droplist? "dropdown-menu show" : "dropdown-menu"}>
                                             <div className="inner">
                                             <ul>
                                                   <li>
                                                      <a role="option" className="dropdown-item" onClick={this.clickOption}>
                                                         <span className="text">5</span>
                                                      </a>
                                                   </li>
                                                   <li>
                                                      <a role="option" className="dropdown-item" onClick={this.clickOption}>
                                                         <span className="text">10</span>
                                                      </a>
                                                   </li>
                                                   <li>
                                                      <a role="option" className="dropdown-item" onClick={this.clickOption}>
                                                         <span className="text">20</span>
                                                      </a>
                                                   </li>
                                                   <li>
                                                      <a role="option" className="dropdown-item" onClick={this.clickOption}>
                                                         <span className="text">30</span>
                                                      </a>
                                                   </li>
                                                </ul>
                                             </div>
                                          </div>
                                       </div>
                                       <span className="page-detail">
                                          Showing {this.state.currentPage*this.state.pageLimit+1} - {(this.state.currentPage*this.state.pageLimit+this.state.pageLimit > this.props.projectlist.filter(project => {return project.projectname.includes(this.state.keyword)}).length) ? this.props.projectlist.filter(project => {return project.projectname.includes(this.state.keyword)}).length : Number(this.state.currentPage*this.state.pageLimit+this.state.pageLimit)} of {this.props.projectlist.filter(project => {return project.projectname.includes(this.state.keyword)}).length}     
                                       </span>
                                 </div>
                              </div>
                           </div>
                        }
                     />
                  </Col>
               </Row>
            </Container>
            <this.DelModal />
            <this.CreateModal />
            <this.ErrModal />
            <this.EditModal />
         </div>
      );
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Project);
