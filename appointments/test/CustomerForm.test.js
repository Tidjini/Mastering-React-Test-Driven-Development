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
  const itRendersAsATextBox = (fieldName) => {
    it("renders a textbox", () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field("customer", fieldName));
    });
  };
  const itIncludesTheExistingValue = (fieldName, value) => {
    it("includes the existing value", () => {
      render(<CustomerForm {...{ [fieldName]: value }} />);
      expect(field("customer", fieldName).value).toEqual(value);
    });
  };

  const itRendersLabel = (fieldName, label) => {
    it("renders label", () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(label);
    });
  };

  const itAssignId = (fieldName, id) => {
    it("assign an id that matches the label id", () => {
      render(<CustomerForm />);
      expect(field("customer", fieldName).id).toEqual(id);
    });
  };
  const itSaveExistingWhenSubmitted = (fieldName, value) => {
    //submitting
    it("save exisiting when submitted", async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: value }}
          onSubmit={(props) => expect(props[fieldName]).toEqual(value)}
        />
      );

      await act(async () => ReactTestUtils.Simulate.submit(form("customer")));
    });
  };
  const itSavesNewWhenSubmitted = (fieldName, value) => {
    it("saves new when submitted", async () => {
      expect.hasAssertions();

      render(
        <CustomerForm
          {...{ [fieldName]: "existing value" }}
          onSubmit={(props) => expect(props[fieldName]).toEqual(value)}
        />
      );

      await act(async () => {
        ReactTestUtils.Simulate.change(field("customer", fieldName), {
          target: { value: value, name: fieldName },
        });
      });
      await act(async () => ReactTestUtils.Simulate.submit(form("customer")));
    });
  };
  it("renders a form", () => {
    render(<CustomerForm />);
    expect(form("customer")).not.toBeNull();
  });
  describe("test name field", () => {
    itRendersAsATextBox("firstName");
    itIncludesTheExistingValue("firstName", "Ashley");
    itRendersLabel("firstName", "First name");
    itAssignId("firstName", "firstName");
    itSaveExistingWhenSubmitted("firstName", "Ashley");
    itSavesNewWhenSubmitted("firstName", "Jamie");
  });
  describe("last name field", () => {
    itRendersAsATextBox("lastName");
    itIncludesTheExistingValue("lastName", "Ashley");
    itRendersLabel("lastName", "Last name");
    itAssignId("lastName", "lastName");
    itSaveExistingWhenSubmitted("lastName", "Ashley-");
    itSavesNewWhenSubmitted("lastName", "Jamie");
  });
  describe("phone number field", () => {
    itRendersAsATextBox("phoneNumber");
    itIncludesTheExistingValue("phoneNumber", "(132) 555-0123");
    itRendersLabel("phoneNumber", "Last name");
    itAssignId("phoneNumber", "phoneNumber");
    itSaveExistingWhenSubmitted("phoneNumber", "(132) 555-0123");
    itSavesNewWhenSubmitted("phoneNumber", "(132) 555-0124");
  });
  it("has a submit button", () => {
    render(<CustomerForm />);
    const submitButton = container.querySelector('input[type="submit"]');
    expect(submitButton).not.toBeNull();
  });
});
