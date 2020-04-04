import React from "react";
import ReactDOM from "react-dom";

import { Simulate } from "react-dom/test-utils";

import ContactUs from "./ContactUs";

import { ISubmitResult } from "./Form";

import { render, cleanup, fireEvent } from "@testing-library/react";

afterEach(cleanup);

describe("ContactUs", () => {
  test("When submit without filling in fields should display errors", () => {
    /* const handleSubmit = async (): Promise<ISubmitResult> => {
      return {
        success: true
      };
    }; */
    const handleSubmit = jest.fn();

    const { getAllByText, getByText } = render(
      <ContactUs onSubmit={handleSubmit} />
    );

    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    const errorSpans = getAllByText("This must be populated");
    expect(errorSpans.length).toBe(2);

    expect(handleSubmit).not.toBeCalled();
  });

  test("When submit after filling in fields should submit okay", () => {
    const handleSubmit = jest.fn();
    handleSubmit.mockReturnValue({
      success: true
    });

    const { container, getByText, getByLabelText } = render(
      <ContactUs onSubmit={handleSubmit} />
    );

    const nameField: HTMLInputElement = getByLabelText(
      "Your name"
    ) as HTMLInputElement;
    expect(nameField).not.toBeNull();

    fireEvent.change(nameField, {
      target: { value: "Marcelo" }
    });

    const emailField = getByLabelText("Your email address") as HTMLInputElement;
    expect(emailField).not.toBeNull();
    fireEvent.change(emailField, {
      target: { value: "marcecarta@hotmail.com" }
    });

    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    const errorsDiv = container.querySelector("[data-testid='formErrors']");
    expect(errorsDiv).toBeNull();

    const errorSpans = container.querySelectorAll(".form-error");
    expect(errorSpans.length).toBe(0);

    expect(handleSubmit).toBeCalledTimes(1);
    expect(handleSubmit).toBeCalledWith({
      name: "Marcelo",
      email: "marcecarta@hotmail.com",
      reason: "Support",
      notes: ""
    });
  });

  test("Renders okay", () => {
    const handleSubmit = async (): Promise<ISubmitResult> => {
      return {
        success: true
      };
    };
    const { container } = render(<ContactUs onSubmit={handleSubmit} />);

    expect(container).toMatchSnapshot();
  });
});
