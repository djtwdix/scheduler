import React from 'react'
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import "./styles.scss"



export default function Appointment(props) {
  return(
    <div id="root">
      <Header time={props.time} />
      {props.interview ? <Show id={props.id} student={props.interview.student} 
                          interviewer={props.interview.interviewer} /> : <Empty />}
    </div>
  )
}