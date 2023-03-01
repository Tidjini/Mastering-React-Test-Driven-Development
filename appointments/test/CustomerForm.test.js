import React from "react";
import { createContainer } from "./domManipulators";
import { CustomerForm } from "../src/CustomerForm";

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
    const firstNameField = field("customer", "firstName");
    expect(firstNameField.value).toEqual("Ashley");
  });
  it("renders label for the first name", () => {
    render(<CustomerForm />);
    expect(labelFor("firstName")).not.toBeNull();
    expect(labelFor("firstName").textContent).toEqual("First name");
  });
});
