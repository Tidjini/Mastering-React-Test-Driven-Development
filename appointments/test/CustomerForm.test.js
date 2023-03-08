import React from "react";
import { createContainer } from "./domManipulators";
import { AppointmentForm, CustomerForm } from "../src/CustomerForm";
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

describe("Appointment Form", () => {
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

  const itRendersLabel = (fieldName, label) => {
    it("renders label", () => {
      render(<AppointmentForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(label);
    });
  };

  const itAssignId = (fieldName, id) => {
    it("assign an id that matches the label id", () => {
      render(<AppointmentForm />);
      expect(field("appointment", fieldName).id).toEqual(id);
    });
  };
  const itSaveExistingWhenSubmitted = (fieldName, value) => {
    //submitting
    it("save exisiting when submitted", async () => {
      expect.hasAssertions();
      render(
        <AppointmentForm
          {...{ [fieldName]: value }}
          onSubmit={(props) => expect(props[fieldName]).toEqual(value)}
        />
      );

      await act(async () =>
        ReactTestUtils.Simulate.submit(form("appointment"))
      );
    });
  };
  const itSavesNewWhenSubmitted = (fieldName, value) => {
    it("saves new when submitted", async () => {
      expect.hasAssertions();

      render(
        <AppointmentForm
          {...{ [fieldName]: "existing value" }}
          onSubmit={(props) => expect(props[fieldName]).toEqual(value)}
        />
      );

      await act(async () => {
        ReactTestUtils.Simulate.change(field("appointment", fieldName), {
          target: { value: value, name: fieldName },
        });
      });
      await act(async () =>
        ReactTestUtils.Simulate.submit(form("appointment"))
      );
    });
  };

  const findOption = (dropdownNode, textContent) => {
    const options = Array.from(dropdownNode.childNodes);
    return options.find((option) => option.textContent === textContent);
  };

  it("initially has a blank values chosen", () => {
    render(<AppointmentForm />);
    const firstNode = field("appointment", "service").childNodes[0];
    expect(firstNode.value).toEqual("");
    expect(firstNode.selected).toBeTruthy();
  });

  it("lists all salon services", () => {
    const selectableServices = ["Cut", "Blow-dry"];
    render(<AppointmentForm selectableServices={selectableServices} />);

    const optionNodes = Array.from(field("appointment", "service").childNodes);
    const renderedServices = optionNodes.map((node) => node.textContent);
    expect(renderedServices).toEqual(
      expect.arrayContaining(selectableServices)
    );
  });

  describe("test name field", () => {
    itRendersLabel("service", "Service");
    itAssignId("service", "service");
    // itSaveExistingWhenSubmitted("firstName", "Ashley");
    // itSavesNewWhenSubmitted("firstName", "Jamie");
  });
  it("pre-selects the existing value", () => {
    const services = ["Cut", "Blow-dry"];
    render(
      <AppointmentForm selectableServices={services} service="Blow-dry" />
    );
    const option = findOption(field("appointment", "service"), "Blow-dry");
    expect(option.selected).toBeTruthy();
  });
});
