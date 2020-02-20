import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day}
    case SET_APPLICATION_DATA:
      return action.appData
    case SET_INTERVIEW: {
      return { ...state, appointments: action.appointments}
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

  const setDay = day => dispatch({ type: SET_DAY, day: day });

  function bookInterview(id, interview) {
    const appointment = {...state.appointments[id], interview: { ...interview }};
    const appointments = {...state.appointments, [id]: appointment};

    return axios.put(`/api/appointments/${id}`, {interview}).then((response) => {
      dispatch({ type: SET_INTERVIEW, appointments: appointments });
    });
  }

  function cancelInterview(id) {
    const appointment = {...state.appointments[id], interview: null };
    const appointments = {...state.appointments, [id]: appointment};

    return axios.delete(`/api/appointments/${id}`, {id}).then((response) => {
      dispatch({ type: SET_INTERVIEW, appointments: appointments });
    })
  }

  useEffect(() => {
    const getDays = axios.get("/api/days");
    const getAppointments = axios.get("/api/appointments");
    const getInterviewers = axios.get("/api/interviewers")
    
    Promise.all([ getDays, getAppointments, getInterviewers ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, appData: {days: all[0].data, appointments: all[1].data, interviewers: all[2].data}});
    })
     
  }, []);

  return {state, setDay, bookInterview, cancelInterview};
}