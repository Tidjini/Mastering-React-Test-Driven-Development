import React from "react";
import { createContainer } from "./domManipulators";
import { CustomerForm } from "../src/CustomerForm";
import ReactTestUtils, { act } from "react-dom/test-utils";

describe("CustomerForm", () => {
  let render, container;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });
  const form = (id) => container.querySelector(`form[id=${id}]`);
  const labelFor = (id) => container.querySelector(`label[for=${id}]`);
  const field = (formId, fieldName) => form(formId).elements[fieldName];
  const expectToBeInputFieldOfTypeText = (formElement) => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual("INPUT");
    expect(formElement.type).toEqual("text");
  };
  it("renders a form", () => {
    render(<CustomerForm />);
    expect(form("customer")).not.toBeNull();
  });
  it("renders the first name field as a textbox", () => {
    render(<CustomerForm />);
    expectToBeInputFieldOfTypeText(field("customer", "firstName"));
  });

  it("includes the existing value for the first name", () => {
    render(<CustomerForm firstName="Ashley" />);
    expect(field("customer", "firstName").value).toEqual("Ashley");
  });
  it("renders label for the first name", () => {
    render(<CustomerForm />);
    expect(labelFor("firstName")).not.toBeNull();
    expect(labelFor("firstName").textContent).toEqual("First name");
  });
  it("assign an id that matches the label id to the first name field", () => {
    render(<CustomerForm />);
    expect(field("customer", "firstName").id).toEqual("firstName");
  });

  //submitting
  it("save exisiting first name when submitted", async () => {
    expect.hasAssertions();
    render(
      <CustomerForm
        firstName="Ashley"
        onSubmit={({ firstName }) => expect(firstName).toEqual("Ashley")}
      />
    );

    await act(async () => ReactTestUtils.Simulate.submit(form("customer")));
  });

  it("saves new first name when submitted", async () => {
    expect.hasAssertions();

    render(
      <CustomerForm
        firstName="Ashley"
        onSubmit={({ firstName }) => expect(firstName).toEqual("Jamie")}
      />
    );

    await act(async () =>
      ReactTestUtils.Simulate.change(field("customer", "firstName"), {
        target: { value: "Jamie" },
      })
    );
    await act(async () => ReactTestUtils.Simulate.submit(form("customer")));
  });
});
