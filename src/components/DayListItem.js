import React from 'react'
import classNames from 'classnames'
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const {name, spots, setDay} = props
  const formatSpots = (spotsLeft) => {
    return spotsLeft === 0 ? "no spots remaining" : spotsLeft === 1 ? 
           spotsLeft + " spot remaining" : spotsLeft + " spots remaining"
  }
  const dayClass = classNames("day-list__item", 
  {"day-list__item--selected": props.selected}, 
  {"day-list__item--full": props.spots === 0})
  return (
    <li data-testid="day" className={dayClass} onClick={setDay}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}