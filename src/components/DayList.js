import React from 'react'
import DayListItem from "./DayListItem"

export default function DayList(props) {
  const daysArray = props.days
  const daysArrayParsed = daysArray.map(day => {
    return <DayListItem key={day.id} name={day.name} selected={day.name === props.day} 
                        spots={day.spots} setDay={event => props.setDay(day.name)} />
  })
  return(
    <ul>
      {daysArrayParsed}
    </ul>
  )
}