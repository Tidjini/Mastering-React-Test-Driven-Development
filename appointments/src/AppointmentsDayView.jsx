import React from "react";

const appointmentTimeOfDay = (startAt) => {
  const [h, m] = new Date(startAt).toTimeString().split(":");
  return `${h}:${m}`;
};
export const Appointment = ({ customer, startAt }) => {
  return (
    <div>
      <h3>Today's Appointment at {appointmentTimeOfDay(startAt)}</h3>
      <table>
        <tbody>
          <tr>
            <td>Customer</td>
            <td>{customer.firstName}</td>
          </tr>
          <tr>
            <td>Phone number</td>
            <td></td>
          </tr>
          <tr>
            <td>Stylist</td>
            <td></td>
          </tr>
          <tr>
            <td>Service</td>
            <td></td>
          </tr>
          <tr>
            <td>Notes</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const AppointmentsDayView = ({ appointments }) => {
  const [appointment, setAppointment] = React.useState(0);

  return (
    <div id="appointments-day-view">
      <ol>
        {appointments.map((appointment, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => {
                setAppointment(index);
              }}
            >
              {appointmentTimeOfDay(appointment.startAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today.</p>
      ) : (
        <Appointment {...appointments[appointment]} />
      )}
    </div>
  );
};
