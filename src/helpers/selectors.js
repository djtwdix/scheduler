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
    interviewersOnDay.forEach(id => interviewers.push(state.interviewers[id]))
  }
  return interviewers
}

/* export function updateSpots(days, appointments, id, value) {
  days.forEach(day => {
    if ((!appointments[id].interview && value === -1) || value === 1) {
      if(day.appointments.includes(id)) {
        day.spots = parseInt(day.spots) + value
      }
    }
  })
  return days;
} */

function countNullInterviews(day, appointments) {
  let count = 0;
  for (const id of day.appointments) {
    const appointment = appointments[id];
    if (!appointment.interview) {
      count++
    }
  }
  return count;
};
export function updateSpots(dayName, days, appointments) {
  const spreadDays = [...days];
  const day = spreadDays.find(item => item.name === dayName);
  const nulls = countNullInterviews(day, appointments);
  day.spots = nulls;
  return spreadDays;
};