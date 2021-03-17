import React from 'react'
import "components/InterviewerListItem.scss";
import classNames from 'classnames'

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props

  const interviewersItemClass = classNames("interviewers__item", { "interviewers__item--selected": selected })

  return (
    <li key={id} className={interviewersItemClass}>
      <img onClick={setInterviewer}
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}