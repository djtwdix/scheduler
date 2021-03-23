import React, { useState } from 'react'
import Button from "../Button"
import InterviewerList from "../InterviewerList"

export default function (props) {
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const [error, setError] = useState("")

  const handleInput = (event) => {
    setName(event.target.value)
  }
  const save = () => {
    props.onSave(name, interviewer)
  }
  const reset = () => {
    setName("");
    setInterviewer(null)
  }
  const cancel = () => {
    props.onCancel()
    reset()
  }
  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank")
      return
    } 
    setError("")
    save()
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            data-testid ="student-name-input"
            onChange={handleInput}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}