import React from "react";
export const Appointment = ({ customer }) => <div>{customer.firstName}</div>;

export const AppointmentsDayView = ({ appointments }) => {
  return (
    <div id="appointments-day-view">
      <ol>
        {appointments.map((appointment, index) => (
          <div key={index}>{appointment.startAt}</div>
        ))}
      </ol>
    </div>
  );
};
