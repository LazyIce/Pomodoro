import * as React from 'react';
import { Container, Row, Col, Button, Table, Modal } from 'react-bootstrap';
import Card from '../components/Card/Card';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { fetchAllUsers, postUser, putUser, removeUser, clearErrorMessage } from '../redux/actionCreators/user.action';
import UserList from '../components/List/UserList';

// map redux store's state to the prop of the components
const mapStateToProps = (state: any) => {
   return {
      userlist: state.users.list,
      userErrMess: state.users.errMess
   };
};

const mapDispatchToProps = dispatch => ({
   fetchAllUsers: () => {
      dispatch(fetchAllUsers());
   },
   postUser: ({ firstName, lastName, email }) => {
      dispatch(postUser({ firstName, lastName, email }));
   },
   putUser: ({ firstName, lastName, id }) => {
      dispatch(putUser({ firstName, lastName, id }));
   },
   removeUser: userId => {
      dispatch(removeUser(userId));
   }, 
   clearErrorMessage: () => {
      dispatch(clearErrorMessage())
   }
});

interface Props {
   userlist: any;
   userErrMess: any;
   fetchAllUsers: any;
   postUser: any;
   putUser: any;
   removeUser: any;
   clearErrorMessage: any;
}
interface State {
   delete_show: boolean;
   delete_index: number;

   create_show: boolean;
   new_user_first_name: string;
   new_user_last_name: string;
   new_user_email: string;

   edit_show: boolean;
   edit_index: number;
   edit_id: number;
   edit_user_first_name: string;
   edit_user_last_name: string;

   currentUsers: any;
   currentPage: number;
   pageLimit: number;
}

class UserProfile extends React.Component<Props, State> {
   constructor(props: any) {
      super(props);

      this.ErrModalClose = this.ErrModalClose.bind(this);
      this.ErrModal = this.ErrModal.bind(this);

      this.DelModalShow = this.DelModalShow.bind(this);
      this.DelModalClose = this.DelModalClose.bind(this);
      this.DelModal = this.DelModal.bind(this);

      this.CreateModalShow = this.CreateModalShow.bind(this);
      this.CreateModalClose = this.CreateModalClose.bind(this);
      this.CreateModal = this.CreateModal.bind(this);

      this.EditModalClose = this.EditModalClose.bind(this);
      this.EditModalShow = this.EditModalShow.bind(this);
      this.EditModal = this.EditModal.bind(this);

      this.onPageChange = this.onPageChange.bind(this);

      this.state = {
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
         edit_user_last_name: '',

         //@ts-ignore
         currentUsers: null,
         currentPage: 0,
         pageLimit: 5
      };
   }

   componentDidMount() {
      this.props.fetchAllUsers();
      setTimeout(() => {
         this.setState({
            currentUsers: this.props.userlist.slice(this.state.currentPage, this.state.pageLimit)
         });
      }, 1000)
   }

   // Error modal
   ErrModalClose() {
      this.props.clearErrorMessage();
   }

   ErrModal() {
      return (
         <Modal id="error_modal" show={this.props.userErrMess != null} onHide={this.ErrModalClose}>
            <Modal.Header closeButton>
               <Modal.Title>Error Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {this.props.userErrMess}
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

   DelButton(user: any, key: number) {
      if (user.related_projects && user.related_projects.length != 0) {
         this.setState({ delete_index: key });
         this.DelModalShow();
      } else {
         this.props.removeUser(user.id);
      }
   }

   DelUser(userId: number) {
      if (this.state.delete_show) {
         this.DelModalClose();
      }
      this.props.removeUser(userId);
   }

   DelModal() {
      if (this.props.userlist && this.state.delete_index < this.props.userlist.length) {
         return (
            <Modal id="delete_modal" show={this.state.delete_show} onHide={this.DelModalClose}>
               <Modal.Header closeButton>
                  <Modal.Title>Confirmation</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  First name: {this.props.userlist[this.state.delete_index].firstName}
                  <br />
                  Last name: {this.props.userlist[this.state.delete_index].lastName}
                  <br />
                  Email: {this.props.userlist[this.state.delete_index].email}
                  <br />
                  {`This user has ${
                     this.props.userlist[this.state.delete_index].related_projects.length
                  } related projects.`}
                  <br />
                  Are you sure to delete the user?
               </Modal.Body>
               <Modal.Footer>
                  <Button variant="secondary" onClick={this.DelModalClose}>
                     No
                  </Button>
                  <Button
                     id="confirm_delete"
                     variant="primary"
                     onClick={() => this.DelUser(this.props.userlist[this.state.delete_index].id)}
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
         <Modal id="create_modal" show={this.state.create_show} onHide={this.CreateModalClose}>
            <Modal.Header closeButton>
               <Modal.Title>Create a new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Row>
                  <Col>First name</Col>
                  <Col>
                     <input
                        id="create_first_name"
                        value={this.state.new_user_first_name}
                        onChange={(e: any) => {
                           this.setState({ new_user_first_name: e.target.value });
                        }}
                     />
                  </Col>
               </Row>
               <Row>
                  <Col>Last name</Col>
                  <Col>
                     <input
                        id="create_last_name"
                        value={this.state.new_user_last_name}
                        onChange={(e: any) => {
                           this.setState({ new_user_last_name: e.target.value });
                        }}
                     />
                  </Col>
               </Row>
               <Row>
                  <Col>Email</Col>
                  <Col>
                     <input
                        id="create_email"
                        value={this.state.new_user_email}
                        onChange={(e: any) => {
                           this.setState({ new_user_email: e.target.value });
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
                  id="confirm_create_new_user_button"
                  variant="primary"
                  onClick={() => {
                     this.props.postUser({
                        firstName: this.state.new_user_first_name,
                        lastName: this.state.new_user_last_name,
                        email: this.state.new_user_email
                     });
                     this.CreateModalClose();
                     this.setState({ new_user_first_name: '' });
                     this.setState({ new_user_last_name: '' });
                     this.setState({ new_user_email: '' });
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

   EditButton(user: any, key: number) {
      this.setState({
         edit_index: key,
         edit_id: user.id,
         edit_user_first_name: user.firstName,
         edit_user_last_name: user.lastName
      });
      this.EditModalShow();
   }

   EditModal() {
      if (this.props.userlist && this.state.edit_index < this.props.userlist.length) {
         return (
            <Modal id="edit_modal" show={this.state.edit_show} onHide={this.EditModalClose}>
               <Modal.Header closeButton>
                  <Modal.Title>Edit this user</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Row>
                     <Col>First name</Col>
                     <Col>
                        <input
                           id="edit_first_name"
                           value={this.state.edit_user_first_name}
                           onChange={(e: any) => {
                              this.setState({ edit_user_first_name: e.target.value });
                           }}
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col> Last name</Col>
                     <Col>
                        <input
                           id="edit_last_name"
                           value={this.state.edit_user_last_name}
                           onChange={(e: any) => {
                              this.setState({ edit_user_last_name: e.target.value });
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
                        this.props.putUser({
                           firstName: this.state.edit_user_first_name,
                           lastName: this.state.edit_user_last_name,
                           id: this.state.edit_id
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
      let offset = selected * this.state.pageLimit;
      this.setState({
         currentPage: selected,
         currentUsers: this.props.userlist.slice(offset, offset+this.state.pageLimit)
      });
   }

   render() {
      //@ts-ignore

      return (
         <div className="content">
            <Container fluid>
               <Row>
                  <Col md={12}>
                     <Card
                        title="User Profiles Table"
                        icon="pe-7s-graph3"
                        hCenter={true}
                        ctTableFullWidth
                        ctTableResponsive
                        content={
                           <div className="card-content">
                              <div className="widget-row">
                                 <div className="input-container col-md-4">
                                    <input type="text" placeholder="Search..." id="general-search"/>
                                    <span className="input-icon">
                                       <span><i className="pe-7s-search" /></span>
                                    </span>
                                 </div>
                                 <div className="btn-container col-md-3">
                                    <Button
                                       id="create_new_user_button"
                                       className="col"
                                       variant="primary"
                                       onClick={() => this.CreateModalShow()}
                                    >
                                       Create New User
                                    </Button>
                                 </div>
                              </div>
                              <div className="table-container">
                                 <Table striped hover>
                                    <thead>
                                       <tr>
                                          <th>No.</th>
                                          <th>First Name</th>
                                          <th>Last Name</th>
                                          <th>Email</th>
                                          <th>Related Projects</th>
                                          <th>operations</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {
                                          this.state.currentUsers &&
                                          this.state.currentUsers.map((user: any, index: number) => {
                                             return (
                                                <UserList
                                                   user={user}
                                                   key={index}
                                                   index={index}
                                                   delete_button={() => this.DelButton(user, index)}
                                                   edit_button={() => this.EditButton(user, index)}
                                                />
                                             );
                                          })
                                       }
                                    </tbody>
                                 </Table>
                              </div>
                              <div className="pagination-container">
                                 <ReactPaginate
                                    previousLabel={'previous'}
                                    nextLabel={'next'}
                                    breakLabel={'...'}
                                    pageCount={Math.ceil(this.props.userlist.length / this.state.pageLimit)}
                                    initialPage={0}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={3}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                    onPageChange={this.onPageChange}
                                 />
                                 <div className="page-info">
                                       <div className="page-dropdown">
                                          <button className="dropdown-toggle">
                                             <div className="filter-option">
                                                <div className="filter-option-inner">
                                                   <div className="filter-option-inner-inner">5</div>
                                                </div>
                                             </div>
                                          </button>
                                          <div className="dropdown-menu">
                                             <div className="inner">
                                                <ul>
                                                   <li className="selected active">
                                                      <a role="option" className="dropdown-item selected active">
                                                         <span className="text">5</span>
                                                      </a>
                                                   </li>
                                                   <li>
                                                      <a role="option" className="dropdown-item">
                                                         <span className="text">10</span>
                                                      </a>
                                                   </li>
                                                   <li>
                                                      <a role="option" className="dropdown-item">
                                                         <span className="text">20</span>
                                                      </a>
                                                   </li>
                                                   <li>
                                                      <a role="option" className="dropdown-item">
                                                         <span className="text">30</span>
                                                      </a>
                                                   </li>
                                                </ul>
                                             </div>
                                          </div>
                                       </div>
                                       <span className="page-detail">
                                          Showing {this.state.currentPage*this.state.pageLimit+1} - {this.state.currentPage*this.state.pageLimit+this.state.pageLimit > this.props.userlist.length? this.props.userlist.length : this.state.currentPage*this.state.pageLimit+this.state.pageLimit} of {this.props.userlist.length}     
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
            <this.EditModal />
            <this.ErrModal />
         </div>
      );
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(UserProfile);
