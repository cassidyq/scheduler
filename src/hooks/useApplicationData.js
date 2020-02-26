import { useReducer, useEffect } from "react";
import axios from "axios";

import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "reducers/application";

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => dispatch({ type: SET_DAY, day: day });

  function bookInterview(id, interview) {
    let editSpots = 'edit';
    if(state.appointments[id].interview === null) {
      editSpots = 'add';
    }

    return axios.put(`/api/appointments/${id}`, {interview}).then((response) => {
      dispatch({ type: SET_INTERVIEW, value: { interview: { ...interview }, spots: editSpots, id: id }});
    });
  }

  function cancelInterview(id) {

    return axios.delete(`/api/appointments/${id}`, {id}).then((response) => {
      dispatch({ type: SET_INTERVIEW, value: { interview: null, spots: 'delete', id: id}})
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