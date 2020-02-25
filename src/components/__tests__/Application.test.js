import axios from "axios";
import React from "react";

import { render, getByText, getAllByTestId, prettyDOM, cleanup, waitForElement } from "@testing-library/react";

import Application from "components/Application";
import { fireEvent } from "@testing-library/react/dist";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    console.log(prettyDOM(container));

    // const appointments = getAllByTestId(container, "appointment");
    // console.log(prettyDOM(appointments));

    // const appointment = getAllByTestId(container, "appointment")[0];
    // console.log(prettyDOM(appointment));

  });
});
