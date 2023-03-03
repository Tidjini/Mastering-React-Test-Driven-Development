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
      render(<CustomerForm firstName={value} />);
      expect(field("customer", fieldName).value).toEqual(value);
    });
  };

  describe("test name field", () => {
    it("renders a form", () => {
      render(<CustomerForm />);
      expect(form("customer")).not.toBeNull();
    });
    itRendersAsATextBox("firstName");
    itIncludesTheExistingValue("firstName", "Ashley");

    it("renders label", () => {
      render(<CustomerForm />);
      expect(labelFor("firstName")).not.toBeNull();
      expect(labelFor("firstName").textContent).toEqual("First name");
    });
    it("assign an id that matches the label id", () => {
      render(<CustomerForm />);
      expect(field("customer", "firstName").id).toEqual("firstName");
    });

    //submitting
    it("save exisiting when submitted", async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          firstName="Ashley"
          onSubmit={({ firstName }) => expect(firstName).toEqual("Ashley")}
        />
      );

      await act(async () => ReactTestUtils.Simulate.submit(form("customer")));
    });

    it("saves new when submitted", async () => {
      expect.hasAssertions();

      render(
        <CustomerForm
          firstName="Ashley"
          onSubmit={({ firstName }) => expect(firstName).toEqual("Jamie")}
        />
      );
      const firstName = field("customer", "firstName");
      await act(async () => {
        ReactTestUtils.Simulate.change(firstName, {
          target: { value: "Jamie", name: "firstName" },
        });
      });
      await act(async () => ReactTestUtils.Simulate.submit(form("customer")));
    });
  });
  describe("last name field", () => {});
  describe("phone number field", () => {});
});
