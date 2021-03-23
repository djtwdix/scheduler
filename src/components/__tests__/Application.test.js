import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, 
         prettyDOM, getAllByTestId, getByRole, getByPlaceholderText, 
         getByAltText, queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes schedule when a new day is selected", async () => {
    const {getByText} = render(<Application />);
    await waitForElement(() => getByText("Monday"))
        fireEvent.click(getByText("Tuesday"))
        expect(getByText("Leopold Silvers")).toBeInTheDocument()
  });
  it("loads data, books interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments[0]
    fireEvent.click(getByRole(appointment, "img"))
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: {value: "Lydia Miller Jones"}
    })
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => queryByText(container, "Lydia Miller Jones"))
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(day, "no spots remaining")).toBeInTheDocument()
  });
})
