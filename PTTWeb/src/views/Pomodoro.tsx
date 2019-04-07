import * as React from 'react';
import { Container, Row, Col, Button, Modal} from 'react-bootstrap';
import Card from '../components/Card/Card';

import { connect } from 'react-redux';
import moment from 'moment';
import { fetchAllProjects, clearErrorMessage } from '../redux/actionCreators/project.action';

import { sessionService } from '../services/session.service';

import OptionList from '../components/List/OptionList';


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
    clearErrorMessage: () =>{
        dispatch(clearErrorMessage());
    }
 });

interface Props {
    projectlist: any,
    projectErrMess: any,
    fetchAllProjects: any,
    clearErrorMessage: any
};

interface State {
    minutes: number,
    seconds: number,
    hours: number,
    total_seconds: number,
    associated_id: number,
    active_session_id: number,

    start_time: String,
    end_time: String,
    total_hours: number,
    
    create_show: boolean,
    continue_show: boolean,
    stop_show: boolean,
    active: boolean,
    counter: number,

    error_message: any
};

class Pomodoro extends React.Component<Props, State>{
    
    //-----------------------------------
    //Three functions for modals to create new pomodoro
    CreateModal(){
        return <Modal id="create_modal" show={this.state.create_show} onHide={this.CreateModalClose}>
            <Modal.Header>
                <Modal.Title>Remaining time in current Active Pomodoro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <input 
                        id="create_hours"
                        value={this.state.hours}
                        onChange={(e: any) =>{
                            this.setState({hours: e.target.value% 100});
                        }}/>
                    hour(s)
                </Row>
                <Row>
                    <input
                        id="create_minutes"
                        value={this.state.minutes}
                        onChange={(e: any) =>{
                            this.setState({minutes: e.target.value % 100});
                        }}/>
                    minute(s)
                </Row>
                <Row>
                    <input
                        id="create_second"
                        value={this.state.seconds}
                        onChange={(e: any) =>{
                            this.setState({seconds: e.target.value % 100});
                        }}/>
                    second(s)
                </Row>
                <Row>
                    <select id="project_select_box" value={this.state.associated_id} onChange={this.ChangeSelect} >
                        <option value={-1}> No association </option>
                        {this.props.projectlist.map((project: any, index: number) =>{
                            return (
                                <OptionList project={project} />
                            );
                        })}
                    </select>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button id="create_cancel_button" variant="secondary" onClick={this.CreateCancel}>
                    Cancel
                </Button>
                <Button id="create_confirm_button" variant="primary" onClick={this.CreateSubmit}
                disabled={this.state.hours == 0 && this.state.minutes==0 && this.state.seconds==0}> Submit </Button>
            </Modal.Footer>
        </Modal>
    }

    CreateModalShow(){
        this.setState({
            create_show: true
        });
    }

    CreateModalClose(){
        this.setState({
            create_show: false,
        });
    }

    //-----------------------------------
    //Three functions representing the action of user on create modal
    CreateSubmit(){
        var time = moment().format('YYYY-MM-DDTHH:mmZ');
        console.log(time);
        this.setState({
            start_time: time
        })
        if(this.state.associated_id != -1){
            this.CreateSession();
        }
        this.CreatePomodoro();
        this.CreateModalClose();
    }
    CreateCancel(){
        this.TimeClear();
        this.CreateModalClose();
    }
    ChangeSelect(e: any){
        this.setState({
            associated_id: e.target.value
        })
    }

    //-----------------------------------
    //Four functions to continues create new pomodoros when one is completed
    ContinueModal(){
        return (
            <Modal id="continue_modal" show={this.state.continue_show} onHide={this.ContinueOver}>
                <Modal.Header>
                    Are you going to append a new pomodoro. If so, set time and click Yes. If not, click No
                </Modal.Header>
                <Modal.Body>
                <Row>
                    <input 
                        id="continue_hours"
                        value={this.state.hours}
                        onChange={(e: any) =>{
                            this.setState({hours: e.target.value% 100});
                        }}/>
                    hour(s)
                </Row>
                <Row>
                    <input
                        id="continue_minutes"
                        value={this.state.minutes}
                        onChange={(e: any) =>{
                            this.setState({minutes: e.target.value % 100});
                        }}/>
                    minute(s)
                </Row>
                <Row>
                    <input
                        id="continue_second"
                        value={this.state.seconds}
                        onChange={(e: any) =>{
                            this.setState({seconds: e.target.value % 100});
                        }}/>
                    second(s)
                </Row>
                
                <Row>
                    <Col># of pomodoro completed</Col>
                    <Col>{this.state.counter}</Col>
                </Row>
                <Row>
                    <Col>Session Start time</Col>
                    <Col>{this.state.start_time}</Col>
                </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="continue_cancel_button" variant="secondary" onClick={(this.ContinueOver)}>
                        No
                    </Button>
                    <Button id="continue_confirm_button" variant="primary" onClick={this.Continue} disabled={this.state.hours == 0 && this.state.minutes==0 && this.state.seconds==0}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    ContinueModalShow(){
        this.setState({
            continue_show: true
        });
    }

    ContinueModalClose(){
        this.setState({
            continue_show: false
        })
    }

    ModalSessionInformation(){
        return(
            <div>
            <Row>
                <Col>Number of pomodoro completed</Col>
                <Col>{this.state.counter}</Col>
            </Row>
            <Row>
                <Col>Session Start time</Col>
                <Col>{this.state.start_time}</Col>
            </Row>

            </div>
        );
    }
    
    //-----------------------------------
    //two functions representing two actions user chooses
    Continue(){
        this.ContinueModalClose();
        this.CreatePomodoro();
    }

    ContinueOver(){
        this.ContinueModalClose();
        if(this.state.associated_id != -1){
            this.UpdateSession();
        }
        this.TimeClear();
        //console.log(this.state.associated_id);
    }

    //--------------------------------
    //Three functions to control the stop modal
    StopModal(){
        return (
            <Modal id="stop_modal" show={this.state.stop_show} onHide={this.StopModalClose}>
                <Modal.Header>
                    You are going to stop current pomodoro.
                </Modal.Header>
                <Modal.Body>
                    Are you going to include the runtime of current incomplete pomodoro?
                    <Row>
                        <Col># of pomodoro completed</Col>
                        <Col>{this.state.counter}</Col>
                    </Row>
                    <Row>
                        <Col>Session Start time</Col>
                        <Col>{this.state.start_time}</Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        id="stop_cancel_button"
                        onClick={this.StopCancel}
                        variant="secondary">
                        No
                    </Button>
                    <Button
                        id="stop_confirm_button"
                        onClick={this.StopConfirm}
                        variant="primary">
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    StopModalShow(){
        this.setState({
            stop_show: true
        })
    }

    StopModalClose(){
        this.setState({
            stop_show: false
        })
    }


    //-----------------------------------
    //Two functions representing different action of user in StopModal
    StopCancel(){
        this.StopModalClose();
        if(this.state.associated_id != -1){
            this.UpdateSession();
        }
        this.TimeClear();
        //@ts-ignore
        clearInterval(this.interval);
        this.setState({
            active: false,
            counter: 0
        })
    }
    StopConfirm(){
        this.StopModalClose();
        var time = moment().format('YYYY-MM-DDTHH:mmZ');
        this.setState({
            end_time: time
        });

        if(this.state.associated_id != -1){
            this.UpdateSession();
        }
        this.TimeClear();

        //@ts-ignore
        clearInterval(this.interval);
        this.setState({
            active: false,
            counter: 0
        })
    }

    //-----------------------------------
    //functions for the modal to represent the error in HTTP Request
    ProjectErrorModal(){
        return(
            <Modal show={this.props.projectErrMess != null} onHide={this.ProjectErrorModalClose}>
                <Modal.Header>
                    Error happened in fetching all projects
                </Modal.Header>
                <Modal.Body>
                    {this.props.projectErrMess}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        id="project_error_button"
                        variant="primary"
                        onClick={this.ProjectErrorModalClose}>
                    Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    ProjectErrorModalClose(){
        this.props.clearErrorMessage();
    }

    PomodoroErrorModal(){
        return (
            <Modal show={this.state.error_message != null} onHide={this.PomodoroErrorModalClose}>
                <Modal.Header>
                    There is an error in pomodoro part
                </Modal.Header>

                <Modal.Body>
                    {this.state.error_message}
                </Modal.Body>

                <Modal.Footer>
                    <Button id="pomodoro_error_button" onClick={this.PomodoroErrorModalClose} variant="primary">
                        Ok
                    </Button>
                </Modal.Footer>

            </Modal>
        )
    }

    PomodoroErrorModalClose(){
        this.setState({
            error_message: null
        })
    }

    //-----------------------------------
    //Three functions for tracking time
    TimeClear(){
        this.setState({
            hours: 0,
            minutes: 0,
            seconds: 0,
            total_seconds: 0,
        });
    }

    CreatePomodoro(){
        var temp_seconds = this.state.seconds;
        var temp_minutes = this.state.minutes;
        var temp_hours = this.state.hours;
        if(temp_seconds >= 60){
            temp_seconds -= 60;
            temp_minutes += 1;
        }
        if(temp_minutes >= 60){
            temp_minutes -= 60;
            temp_hours += 1;
        }
        this.setState({
            active: true,
            total_seconds: temp_hours * 3600 + temp_minutes * 60 + temp_seconds,
            hours: temp_hours,
            minutes: temp_minutes,
            seconds: temp_seconds
        });

        //@ts-ignore
        this.interval = setInterval(this.Countdown, 1000);
    }

    Countdown(){
        if(this.state.active){
            var seconds = this.state.seconds;
            var minutes = this.state.minutes;
            var hours = this.state.hours;
            var total_seconds = this.state.total_seconds;
            seconds --;
            total_seconds --;
            //console.log("here");
            if(seconds < 0){
                seconds += 60;
                minutes -= 1;
            }
            if(minutes < 0){
                minutes += 60;
                hours -= 1;
            }
            this.setState({
                seconds: seconds,
                hours: hours,
                minutes: minutes,
                total_seconds: total_seconds
            });
            if(total_seconds <= 0){
                //@ts-ignore
                clearInterval(this.interval);
                var time = moment().format('YYYY-MM-DDTHH:mmZ');
                this.setState({
                    end_time: time,
                    counter: this.state.counter + 1,
                    active: false
                });
                this.ContinueModalShow();
            }
        }
    }

    //Two actions that will deal with API
    CreateSession(){
        sessionService.addUserProjectSession(Number(localStorage.getItem('id')), this.state.associated_id, this.state.start_time).then((res)=>{
            console.log(res.data);
            this.setState({
                active_session_id: res.data.id
            });
        })
        .catch((error) =>{
            console.log(error.message)
            this.setState({
                error_message: error.message
            })
        })
    }  

    UpdateSession(){
        console.log(this.state.counter);
        sessionService.updateUserProjectSession(Number(localStorage.getItem('id')), this.state.associated_id, this.state.active_session_id, this.state.start_time, this.state.end_time, this.state.counter)
        .then((res)=>{
            console.log(res.data);
        })
        .catch((error) =>{
            console.log(error.message)
            this.setState({
                error_message: error.message
            })
        });
    }

    constructor(props: Props) {
        super(props);
        this.CreateModal = this.CreateModal.bind(this);
        this.CreateModalClose = this.CreateModalClose.bind(this);
        this.CreateModalShow = this.CreateModalShow.bind(this);
        this.ChangeSelect = this.ChangeSelect.bind(this);
        this.CreateSubmit = this.CreateSubmit.bind(this);
        this.CreateCancel = this.CreateCancel.bind(this);

        this.ContinueModal = this.ContinueModal.bind(this);
        this.ContinueModalShow = this.ContinueModalShow.bind(this);
        this.ContinueModalClose = this.ContinueModalClose.bind(this);

        this.Continue = this.Continue.bind(this);
        this.ContinueOver = this.ContinueOver.bind(this);

        this.StopModal = this.StopModal.bind(this);
        this.StopModalShow = this.StopModalShow.bind(this);
        this.StopModalClose = this.StopModalClose.bind(this);
        
        this.StopConfirm = this.StopConfirm.bind(this);
        this.StopCancel = this.StopCancel.bind(this);

        this.UpdateSession = this.UpdateSession.bind(this);
        this.CreateSession = this.CreateSession.bind(this);

        this.TimeClear = this.TimeClear.bind(this);
        this.CreatePomodoro = this.CreatePomodoro.bind(this);
        this.Countdown = this.Countdown.bind(this);

        this.ProjectErrorModal = this.ProjectErrorModal.bind(this);
        this.ProjectErrorModalClose = this.ProjectErrorModalClose.bind(this);
        this.PomodoroErrorModal = this.PomodoroErrorModal.bind(this);
        this.PomodoroErrorModalClose = this.PomodoroErrorModalClose.bind(this);

        this.state = {
            seconds: 0,
            minutes: 0,
            hours: 0,
            total_seconds: 0,
            associated_id: -1,
            active_session_id: -1,
            
            start_time: "",
            end_time: "",
            total_hours: 0,

            create_show: false,
            continue_show: false,
            stop_show: false,
            active: false,
            counter: 0,

            error_message: null
        };
        //@ts-ignore
        this.interval;

    }

    componentDidMount(){
        this.props.fetchAllProjects(Number(localStorage.getItem('id')));
    }

    render(){
        return (
            <div>
               <Container fluid>
                  <Row>
                     <Col md={12}>
                        <Card
                           title="Pomodoros"
                           category="You can create and track your Pomodoro Here"
                           ctTableFullWidth
                           ctTableResponsive
                           content={
                              <div>
                                  <Row>
                                      <Col>
                                        <Button
                                            id="create_pomodoro_button"
                                            variant="primary"
                                            onClick={this.CreateModalShow}
                                            disabled={this.state.active}
                                            className="col">
                                            Create a New Pomodoro
                                            </Button>
                                        </Col>
                                      <Col>
                                        <Button
                                            id="stop_pomodoro_button"
                                            onClick={this.StopModalShow}
                                            variant="secondary"
                                            disabled={!this.state.active}
                                            className="col">
                                            Stop current ongoing Pomodoro
                                        </Button>
                                      </Col>
                                  </Row>
                                  
                                  <div style={{fontSize: "64px", textAlign: "center"}}>
                                    {("0" + this.state.hours.toString()).slice(-2)} : {("0" + this.state.minutes.toString()).slice(-2)} : {("0" + this.state.seconds.toString()).slice(-2)}
                                    {this.state.active}
                                  </div>
                              </div>
                           }
                        />
                     </Col>
                  </Row>
               </Container>
               <this.CreateModal></this.CreateModal>
               <this.ContinueModal></this.ContinueModal>
               <this.StopModal></this.StopModal>
               <this.ProjectErrorModal></this.ProjectErrorModal>
               <this.PomodoroErrorModal></this.PomodoroErrorModal>
            </div>
        )
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pomodoro);