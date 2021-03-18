import React from 'react'
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import "./styles.scss"
import useVisualMode from "../../hooks/useVisualMode"



export default function Appointment(props) {
  const EMPTY = "EMPTY"
  const SHOW = "SHOW"
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const {mode, transition, back} = useVisualMode(props.interview? SHOW: EMPTY)

  const onAdd = () => {
    transition(CREATE)
  }

  const onCancel = () => {
    back()
  }

  const onSave = () => {
    transition(SAVING)
  }

  return(
    <div className="appointment">
      <Header time={props.time} />
      {mode === SHOW && <Show id={props.id} student={props.interview.student} 
                          interviewer={props.interview.interviewer} />}
                          
      {mode === EMPTY && <Empty onAdd={onAdd}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={onCancel} onSave={onSave} />}
      {mode === SAVING && <Status />}
    </div>
  )
}