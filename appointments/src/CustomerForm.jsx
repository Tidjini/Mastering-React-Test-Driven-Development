import React from "react";

export const CustomerForm = ({ firstName, lastName, onSubmit }) => {
  const [customer, setCustomer] = React.useState({ firstName });
  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    setCustomer((customer) => ({ ...customer, [name]: value }));
  };
  return (
    <form
      id="customer"
      onSubmit={() => {
        return onSubmit(customer);
      }}
    >
      <label htmlFor="firstName">
        First name
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={firstName}
          onChange={handleChangeForm}
        />
      </label>
      <label htmlFor="lastName">
        Last name
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={lastName}
          onChange={handleChangeForm}
        />
      </label>
    </form>
  );
};
