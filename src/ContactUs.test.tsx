import React from "react";
import ReactDOM from "react-dom";

import { Simulate } from "react-dom/test-utils";

import ContactUs from "./ContactUs";

import { ISubmitResult } from "./Form";

import { render, cleanup, fireEvent } from "@testing-library/react";

afterEach(cleanup);

describe("ContactUs", () => {
  test("When submit without filling in fields should display errors", () => {
    const handleSubmit = async (): Promise<ISubmitResult> => {
      return {
        success: true
      };
    };

    const { getAllByText, getByText } = render(
      <ContactUs onSubmit={handleSubmit} />
    );

    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    const errorSpans = getAllByText("This must be populated");
    expect(errorSpans.length).toBe(2);
    
  });
});
