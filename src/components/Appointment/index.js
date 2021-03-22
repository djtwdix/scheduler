import React, { useEffect } from 'react'
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import "./styles.scss"
import useVisualMode from "../../hooks/useVisualMode"



export default function Appointment(props) {

  const EMPTY = "EMPTY"
  const SHOW = "SHOW"
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"
  const {mode, transition, back} = useVisualMode(props.interview? SHOW: EMPTY)

  const onAdd = () => {
    transition(CREATE)
  }

  const onCancel = () => {
    back()
  }

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(res => transition(SHOW))
    .catch(err => {
      transition(ERROR_SAVE, true)
    })
    
  }

  const confirm = () => { 
    transition(CONFIRM)
  }
  
  const cancelInterview = (id) => {
    transition(DELETING, true)
    props.cancelInterview(id)
    .then(res => transition(EMPTY))
    .catch(err => transition(ERROR_DELETE, true))
  }
  
  const edit = () => {
    transition(EDIT)
  }
  
  useEffect(() => {
    if (mode=== EMPTY && props.interview) {
      transition(SHOW)
    }
  
    if (mode === SHOW && !props.interview) {
      transition(EMPTY)
    }
  }, [props.interview, transition, mode])

  return(
    <div className="appointment">
      <Header time={props.time} />
      {mode === SHOW && props.interview && <Show id={props.id} student={props.interview.student} 
                          interviewer={props.interview.interviewer} onDelete={confirm} onEdit={edit}/>}
                          
      {mode === EMPTY && <Empty onAdd={onAdd}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={onCancel}  />}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === CONFIRM && <Confirm message="Delete the appointment?" id={props.id} onCancel={onCancel} 
                                    onConfirm={cancelInterview}/>}
      {mode === EDIT && props.interview && <Form name={props.interview.student} interviewer={props.interview.interviewer.id} 
                              interviewers={props.interviewers} onSave={save} onCancel={onCancel} />}
      {mode === ERROR_SAVE && <Error message="Error saving your appointment" onClose={onCancel}/>}
      {mode === ERROR_DELETE && <Error message="Error deleting your appointment" onClose={onCancel}/>}
    </div>
  )
}