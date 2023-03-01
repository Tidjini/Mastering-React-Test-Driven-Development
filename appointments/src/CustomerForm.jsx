import React from "react";

export const CustomerForm = ({ firstName }) => (
  <form id="customer">
    <label htmlFor="firstName">First name</label>
    <input
      type="text"
      name="firstName"
      id="firstName"
      defaultValue={firstName}
    />
  </form>
);
