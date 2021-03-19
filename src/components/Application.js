import React, { useState, useEffect } from "react";

import Appointment from "./Appointment"
import DayList from "./DayList";
import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors"
import useApplicationData from "../hooks/useApplicationData"

export default function Application() {

  const {state, setDay, cancelInterview, bookInterview} = useApplicationData()

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day)

  const parsedAppointments = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return (<Appointment key={appointment.id} {...appointment} interview={interview} interviewers={interviewers}
      bookInterview={bookInterview} cancelInterview={cancelInterview}/>)
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointments}
        <Appointment key="last" time="5pm" interviewers={interviewers} />
      </section>
    </main>
  );
}
