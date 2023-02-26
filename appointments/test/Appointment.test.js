import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Appointment } from "../src/Appointment";
//jest use jsdom a headless implementation of the DOM
describe("Appointements", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });
  const render = (component) =>
    act(() => ReactDOM.createRoot(container).render(component));

  it("render the customer first name", () => {
    const customer = { firstName: "Ashley" };
    render(<Appointment customer={customer} />);

    expect(document.body.textContent).toMatch("Ashley");
  });

  it.skip("renders another customer first name", () => {
    const customer = { firstName: "Jordan" };
    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toMatch("Jordan");
  });
});
