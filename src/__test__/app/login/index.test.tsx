import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Login from "@/app/login/page";

describe("Login page", () => {
  test("initial rendering", async () => {
    render(<Login />);
    const emailForm = await screen.findByTestId("email");
    const passwordForm = await screen.findByTestId("password");
    expect(emailForm).toBeVisible();
    expect(passwordForm).toBeVisible();
  });

  test("button when textfield has value", async () => {
    render(<Login />);
    const emailForm = await screen.findByTestId("email");
    const passwordForm = await screen.findByTestId("password");
    const submitButton = await screen.findByRole("button", { name: "Login" });
    const hidePassword = await screen.findByTestId("hidePassword");

    await userEvent.type(emailForm, "testing@gmail.com");
    await userEvent.type(passwordForm, "testing");
    await userEvent.click(hidePassword);
    await userEvent.click(submitButton);

    expect(passwordForm).toHaveAttribute("type", "text");
    expect(submitButton).toBeEnabled();
  });
});
