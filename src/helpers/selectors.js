export const getAppointmentsForDay = (state, day) => {
  const filteredDays = state.days.filter(item => item.name === day)
  const appointments = []
  if (filteredDays.length) {
    const appointmentsOnDay = filteredDays[0].appointments
    appointmentsOnDay.forEach(id => appointments.push(state.appointments[id]))
  }
  return appointments
}

export const getInterview = (state, interview) => {
  if (interview) {
    interview.interviewer = state.interviewers[interview.interviewer]
  }
  return interview
}