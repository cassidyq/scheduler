

function getAppointmentsForDay(state, day) {
  const results = [];
  const getAppointments = state.days.filter(value => value.name === day);

  if(getAppointments.length > 0) {
    const appointmentArray = getAppointments[0].appointments;
   
    for (const appointmentId of appointmentArray) {
      results.push(state.appointments[appointmentId]); 
    }
  }
  return results;
}

function getInterview(state, interview) {
  if(!interview){
    return null;
  }
  return { 
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
}

module.exports = {
  getAppointmentsForDay,
  getInterview
}