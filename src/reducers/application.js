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
      const day = state.day
      let openSpots = getAppointmentsForDay(state, day).filter(appt => appt.interview === null).length;
      const count = (action.value.on === 'add') ? -1 : (action.value.on === 'edit') ? 0 : 1;
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