import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import 'components/Appointment';
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  const setDay = day => setState({ ...state, day });
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview); 
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
      />  
    )
  });

  useEffect(() => {
    const getDays = axios.get("/api/days");
    const getAppointments = axios.get("/api/appointments");
    const getInterviewers = axios.get("/api/interviewers")
    
    Promise.all([ getDays, getAppointments, getInterviewers ]).then((all) => {
      console.log(all[0], 'get days');
      console.log(all[1], 'get appts');
      console.log(all[2], 'get interviewers');
      setState(prev => ({days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
     
  }, []);

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
        <DayList
          days={state.days}
          day= {state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        <ul>
           {schedule}
        </ul>
      </section>
    </main>
  );
}
