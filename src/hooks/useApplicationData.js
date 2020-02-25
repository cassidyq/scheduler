import { useReducer, useEffect } from "react";
import axios from "axios";

import { getAppointmentsForDay } from "helpers/selectors";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function getSpotsForDay (state, day) {
  const openSpots = getAppointmentsForDay(state, day).filter(appt => appt.interview === null)
  return openSpots.length;
}

function reducer(state, action) {
  
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day}
    case SET_APPLICATION_DATA:
      return {...state, ...action.value}
    case SET_INTERVIEW: {
      const day = state.day
      let openSpots = getSpotsForDay(state, day);
      const count = (action.value.on === 'book') ? -1 : 1;
      openSpots += count;
      const newDays = [...state.days].map(data => {
        if (data.name === day) {
          data = { ...data, spots: openSpots };
        }
        return data;
      });
  
      return { ...state, appointments: action.value.appointments, days: newDays};
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
      dispatch({ type: SET_INTERVIEW, value: { appointments: appointments , on: 'book', id: id }});
    });
  }

  function cancelInterview(id) {
    const appointment = {...state.appointments[id], interview: null };
    const appointments = {...state.appointments, [id]: appointment};

    return axios.delete(`/api/appointments/${id}`, {id}).then((response) => {
      dispatch({ type: SET_INTERVIEW, value: { appointments: appointments, on: 'cancel', id: id}})
    })
  }

  useEffect(() => {
    const getDays = axios.get("/api/days");
    const getAppointments = axios.get("/api/appointments");
    const getInterviewers = axios.get("/api/interviewers");
    
    Promise.all([ getDays, getAppointments, getInterviewers ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, value: {days: all[0].data, appointments: all[1].data, interviewers: all[2].data}});
    })
     
  }, []);

  return {state, setDay, bookInterview, cancelInterview};
}