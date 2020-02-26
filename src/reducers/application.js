import { getAppointmentsForDay } from "helpers/selectors";

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day}
    case SET_APPLICATION_DATA:
      return {...state, ...action.value}
    case SET_INTERVIEW: {
      // get day that is being updated
      const day = state.day
      // get the number of available appointment spots
      let openSpots = getAppointmentsForDay(state, day).filter(appt => appt.interview === null).length;
      // and adjust according to the action taken
      const count = (action.value.spots === 'add') ? -1 : (action.value.spots === 'edit') ? 0 : 1;
      openSpots += count;
      // update spots count for that day
      const newDays = [...state.days].map(data => {
        if (data.name === day) {
          data = { ...data, spots: openSpots };
        }
        return data;
      });
      // update the appointments for the day according to the action taken
      const appointment = {...state.appointments[action.value.id], interview: action.value.interview };
      const appointments = {...state.appointments, [action.value.id]: appointment};
  
      return { ...state, appointments: appointments, days: newDays};
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}