export const getAppointmentsForDay = (state, day) => {
  const filteredDays = state.days.filter(item => item.name === day)
  const appointments = []
  if (filteredDays.length) {
    const appointmentsOnDay = filteredDays[0].appointments
    appointmentsOnDay.forEach(id => appointments.push(state.appointments[id]))
  }
  return appointments
}

export function getInterview(state, interview) {
  if (interview){
    return {interviewer: state.interviewers[interview.interviewer], student: interview.student}
  }
  return null;
}

export const getInterviewersForDay = (state, day) => {
  const filteredDays = state.days.filter(item => item.name === day)
  const interviewers = []
  if (filteredDays.length) {
    const interviewersOnDay = filteredDays[0].interviewers
    console.log(interviewersOnDay)
    interviewersOnDay.forEach(id => interviewers.push(state.interviewers[id]))
  }
  return interviewers
}
