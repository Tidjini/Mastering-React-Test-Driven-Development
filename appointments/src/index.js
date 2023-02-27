import React from "react";
import ReactDOM from "react-dom/client";
import { AppointmentsDayView } from "./Appointment.jsx";
import { sampleAppointments } from "./sampleData";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppointmentsDayView appointments={sampleAppointments} />
);
