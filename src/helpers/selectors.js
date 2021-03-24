/**
 * getAppointmentsForDay() returns an appointments array
 * based on passed in day
 * @param  {object} state
 * @param  {string} name of current day
 */
export const getAppointmentsForDay = (state, day) => {
  const filteredDays = state.days.filter(item => item.name === day)
  const appointments = []
  if (filteredDays.length) {
    const appointmentsOnDay = filteredDays[0].appointments
    appointmentsOnDay.forEach(id => appointments.push(state.appointments[id]))
  }
  return appointments
}

/**
 * getInterview() returns interview object
 * with complete interviewer info from state
 * based on passed in interviewer id
 * @param  {object} state
 * @param  {object} contains student (name) and interviewer (id)
 */
export function getInterview(state, interview) {
  if (interview){
    return {interviewer: state.interviewers[interview.interviewer], student: interview.student}
  }
  return null;
}

/**
 * getInterviewersForDay() returns interviewers array
 * based on interviewers from state for passed in day
 * @param  {} state
 * @param  {} day
 */
export const getInterviewersForDay = (state, day) => {
  const filteredDays = state.days.filter(item => item.name === day)
  const interviewers = []
  if (filteredDays.length) {
    const interviewersOnDay = filteredDays[0].interviewers
    interviewersOnDay.forEach(id => interviewers.push(state.interviewers[id]))
  }
  return interviewers
}

/**
 * countNullInterviewers() returns an integer
 * based on the amount of null interviews for passed in day
 * @param  {object} day
 * @param  {object} appointments
 */
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

/**
 * updateSpots() returns a days array
 * with updated spots remaining for passed in day
 * @param  {string} name of day 
 * @param  {array} daysday objects
 * @param  {object} appointments
 */
export function updateSpots(dayName, days, appointments) {
  const spreadDays = [...days];
  const day = spreadDays.find(item => item.name === dayName);
  const nulls = countNullInterviews(day, appointments);
  day.spots = nulls;
  return spreadDays;
};