import React from 'react'
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import "./styles.scss"
import useVisualMode from "../../hooks/useVisualMode"



export default function Appointment(props) {
  const EMPTY = "EMPTY"
  const SHOW = "SHOW"
  const CREATE = "CREATE"
  const SAVING = "STATUS"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
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
    
  }

  const confirm = () => { 
    transition(CONFIRM)
  }

  const cancelInterview = (id) => {
    transition(DELETING)
    props.cancelInterview(id)
    .then(res => transition(EMPTY))
  }


  return(
    <div className="appointment">
      <Header time={props.time} />
      {mode === SHOW && <Show id={props.id} student={props.interview.student} 
                          interviewer={props.interview.interviewer} onDelete={confirm}/>}
                          
      {mode === EMPTY && <Empty onAdd={onAdd}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={onCancel}  />}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === CONFIRM && <Confirm message="Delete the appointment?" id={props.id} onCancel={onCancel} onConfirm={cancelInterview}/>}
    </div>
  )
}