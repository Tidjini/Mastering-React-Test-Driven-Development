import React from "react";
import ReactDOM from "react-dom";
//jest use jsdom a headless implementation of the DOM
describe("Appointements", () => {
  it("render the customer first name", () => {
    const customer = { firstName: "Ashley" };
    const component = <Appointment customer={customer} />;
    const container = document.createElement("div");
    document.body.appendChild(container);

    ReactDOM.render(component, container);

    expect(document.body.textContent).toMatch("Ashley");
  });
});
