import React from "react";

const appointmentTimeOfDay = (startAt) => {
  const [h, m] = new Date(startAt).toTimeString().split(":");
  return `${h}:${m}`;
};
export const Appointment = ({ customer }) => <div>{customer.firstName}</div>;

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
