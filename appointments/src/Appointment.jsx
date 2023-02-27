import React from "react";

const appointmentTimeOfDay = (startAt) => {
  const [h, m] = new Date(startAt).toTimeString().split(":");
  return `${h}:${m}`;
};
export const Appointment = ({ customer }) => <div>{customer.firstName}</div>;

export const AppointmentsDayView = ({ appointments }) => {
  return (
    <div id="appointments-day-view">
      {appointments && (
        <ol>
          {appointments.map((appointment, index) => (
            <li key={index}>{appointmentTimeOfDay(appointment.startAt)}</li>
          ))}
        </ol>
      )}
      <p>There are no appointments scheduled for today.</p>
    </div>
  );
};
