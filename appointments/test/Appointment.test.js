import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Appointment } from "../src/Appointment";
//jest use jsdom a headless implementation of the DOM
describe("Appointements", () => {
  let container;
  let customer;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  const render = (component) =>
    act(() => ReactDOM.createRoot(container).render(component));

  it("render the customer first name", () => {
    customer = { firstName: "Ashley" };
    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toMatch("Ashley");
  });

  it("renders another customer first name", () => {
    customer = { firstName: "Jordan" };
    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toMatch("Jordan");
  });
});

describe("AppointementsDayView", () => {
  let container;
  let customer;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.replaceChildren(container);
  });

  const render = (component) =>
    act(() => ReactDOM.createRoot(container).render(component));

  it("renders a div with right id", () => {
    customer = { firstName: "Ashley" };
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.querySelector("div#appointments-day-view")).not.toBeNull();
  });
});
