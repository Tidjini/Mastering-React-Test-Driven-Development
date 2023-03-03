import React from "react";

export const AppointmentForm = ({ selectableServices }) => (
  <form id="appointment">
    <select name="service">
      <option />
      {selectableServices.map((s) => (
        <option key={s}>{s}</option>
      ))}
    </select>
  </form>
);

AppointmentForm.defaultProps = {
  selectableServices: ["Cut", "Blow-dry"],
};
export const CustomerForm = ({
  firstName,
  lastName,
  phoneNumber,
  onSubmit,
}) => {
  const [customer, setCustomer] = React.useState({
    firstName,
    lastName,
    phoneNumber,
  });
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
          value={customer.firstName}
          onChange={handleChangeForm}
        />
      </label>
      <label htmlFor="lastName">
        Last name
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={customer.lastName}
          onChange={handleChangeForm}
        />
      </label>
      <label htmlFor="phoneNumber">
        Last name
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={customer.phoneNumber}
          onChange={handleChangeForm}
        />
      </label>
      <input type="submit" value="Add" />
    </form>
  );
};
