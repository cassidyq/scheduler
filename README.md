# Interview Scheduler Project

Interview Scheduler is a single-page appointment booking app.

This project was built using React, data is persisted by the API server using a PostgreSQL database. The client application communicates with the API server over HTTP, using the JSON format. Jest tests were used through the development of the project and end-to-end tests were done using Cypress.

## Final Product

### Create/Edit Appointment

!["Book Appointment"](https://github.com/cassidyq/scheduler/blob/master/docs/appointment-form.png?raw=true)

### Appointment Schedule

!["Schedule"](https://github.com/cassidyq/scheduler/blob/master/docs/appointment-show.png?raw=true)

### Delete Appointment Confirmation

!["Delete Appointment"](https://github.com/cassidyq/scheduler/blob/master/docs/delete-confirm.png?raw=true)

## Getting Started

1. Fork this repository, then clone your fork of this repository.
  - You can also fork and clone this [Scheduler API repository](https://github.com/lighthouse-labs/scheduler-api)
2. Install Scheduler dependencies using the `npm install` command.
3. Start the Scheduler server and the Scheduler API server using the `npm start` command. The Scheduler client app will be served at <http://localhost:8000/> and the Scheduler API server at <http://localhost:8001/>.
4. Go to <http://localhost:8000/> in your browser.
5. To reset the Scheduler API database visit <http://localhost:8001/api/debug/reset>

## Dependencies

- React
- Webpack
- Babel
- Axios
- Storybook
- Webpack Dev Server
- Jest
- Testing Library
- Cypress
- Sass

