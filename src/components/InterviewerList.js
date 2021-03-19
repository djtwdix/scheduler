import React from 'react'
import InterviewerListItem from './InterviewerListItem';
import "./InterviewerList.scss"

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props
  const parsedInterviewers = interviewers.map(interviewer => {
    return (
    <InterviewerListItem  key= {interviewer.id} name={interviewer.name} avatar={interviewer.avatar} 
                          setInterviewer={() => onChange(interviewer.id)} 
                          selected={interviewer.id === value} />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  )
}