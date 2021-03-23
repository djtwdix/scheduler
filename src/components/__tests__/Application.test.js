import React from "react";
import axios from "axios"

import { render, cleanup, waitForElement, fireEvent, getByText, 
         prettyDOM, getAllByTestId, getByRole, getByPlaceholderText, 
         getByAltText, queryByText, waitForElementToBeRemoved } from "@testing-library/react";

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
    const { container } = render(<Application />);
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
  it("loads data, cancels interview and increases spots remaning for Monday by 1", async () => {
    const { container } = render(<Application />)
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"))
    fireEvent.click(getByAltText(appointment, "Delete"))
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument()
    fireEvent.click(getByText(appointment, "Confirm"))
    expect(getByText(appointment, "Deleting")).toBeInTheDocument()
    await waitForElement(() => getByRole(appointment, "img"))
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument()
  });
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />)
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"))
    fireEvent.click(getByAltText(appointment, "Edit"))
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: {value: "Lydia Miller Jones"}
    })
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => queryByText(container, "Lydia Miller Jones"))
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument()
  })
  it ("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce()
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
    await waitForElement(() => getByText(appointment, "Error saving your appointment"))
  })
  it ("shows the delete error when failing to save an appointment", async () => {
    axios.delete.mockRejectedValueOnce()
    const { container } = render(<Application />)
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"))
    fireEvent.click(getByAltText(appointment, "Delete"))
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument()
    fireEvent.click(getByText(appointment, "Confirm"))
    expect(getByText(appointment, "Deleting")).toBeInTheDocument()
    await waitForElement(() => getByText(appointment, "Error deleting your appointment"))
  })
})
