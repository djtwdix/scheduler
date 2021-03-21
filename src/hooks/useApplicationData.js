import { useReducer, useEffect } from 'react'
import axios from 'axios'
import {updateSpots} from "../helpers/selectors"

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {

  switch (action.type) {
    case SET_DAY:
      return { ...state, day : action.day }

    case SET_APPLICATION_DATA: {
      return { ...state, days: action.days, appointments: action.appointments, 
              interviewers: action.interviewers }
    }

    case SET_INTERVIEW: {

      let updateNum = 1
      
      const appointment = {
        ...state.appointments[action.id],
        interview: {...action.interview}
      }
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      }
      

      if (action.interview) {
        updateNum = -1
      }
      
      const days = updateSpots([...state.days], state.appointments, action.id, updateNum)

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
      dispatch({type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })
    })

  }, [])
  
  const bookInterview = (id, interview) => {
    console.log("book int", interview)
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

