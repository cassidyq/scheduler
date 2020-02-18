import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import 'components/Appointment';
import Appointment from "components/Appointment";


const appointments = [
  {
    id: 1,
    time: "12pm"
  },
  {
    id: 2,
    time: "12pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "1pm",
    interview: {
      student: "Jonny Ocean",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 4,
    time: "2pm"
  },
  {
    id: 5,
    time: "3pm",
    interview: {
      student: "Alex White",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 6,
    time: "4pm"
  },
  {
    id: "last",
    time: "5pm"
  },

];

export default function Application(props) {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState("Monday");

  useEffect(() => {
    axios.get("/api/days")
      .then((response) => {
        setDays(response.data);
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
          days={days}
          day= {day}
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
        <ul>{appointments.map( appointment => 
          <Appointment key={appointment.id} {...appointment} />
        )}   
        </ul>
      </section>
    </main>
  );
}
