import { useReducer, useEffect } from 'react'
import axios from 'axios'
import {updateSpots} from "../helpers/selectors"


const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
 const {type, day, days, appointments, interviewers, interview, id} = action
  switch (type) {
    case SET_DAY:
      return { ...state, day }

    case SET_APPLICATION_DATA: {
      return { ...state, days, appointments, 
              interviewers }
    }

    case SET_INTERVIEW: {
      
      const appointment = {
        ...state.appointments[id],
        interview: interview
      }
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      
      const days = updateSpots(state.day, state.days, appointments)

        return { ...state, appointments, days}
    }
    
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => dispatch({ type: SET_DAY, day })
  
  
  useEffect(() => {
    
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      const days = all[0].data
      const appointments = all[1].data
      const interviewers = all[2].data
      dispatch({type: SET_APPLICATION_DATA, days, appointments, interviewers })
    })

  }, []) 
  
  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview
        })
      )
  }

  const cancelInterview = (id) => {

    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview: null
        })
      }
      )
  }

  return {state, setDay, cancelInterview, bookInterview}
}

