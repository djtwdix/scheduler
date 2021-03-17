import React, { useState } from 'react'
import Button from "../Button"
import InterviewerList from "../InterviewerList"

export default function (props) {
  console.log(props.name)
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const handleInput = (event) => {
    setName(event.target.value)
    console.log(name)
  }
  const save = () => {
    props.onSave()
  }
  const reset = () => {
    setName("");
    setInterviewer(null)
  }
  const cancel = () => {
    props.onCancel()
    reset()
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
          <input
            onChange={handleInput}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
          /*
            This must be a controlled componentmnmn
          */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={save} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}