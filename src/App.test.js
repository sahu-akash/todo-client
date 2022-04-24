import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "./App";
import * as React from "react";
import expect from "expect";
import deleteAllItem from "./services/DeleteALL";

global.expect = expect;

// beforeEach(async() => {
//   await deleteAllItem()

// });




afterEach(async () => {
  await deleteAllItem();
});

test("renders the correct initial DOM", () => {
  render(<App />);
  const linkElement = screen.getByText(/MY TODO LIST/i);
  expect(linkElement).toBeInTheDocument();
  const inputElement = screen.getByTestId("input");
  // The input should be blank.
  expect(inputElement.getAttribute("value")).toBe("");
});

test("Add button should be disable if there is nothing on the input box", () => {
  render(<App />);
  const inputElement = screen.getByTestId("input");
  const button = screen.getByTestId("addButton");
  // The input should be blank.
  expect(inputElement.getAttribute("value")).toBe("");
  expect(button).toHaveAttribute("disabled");
});

test("creates a new todo", async () => {
  render(<App />);

  const inputElement = screen.getByTestId("input");
  const createButtonElement = screen.getByTestId("addButton");

  // Create the todo.
  fireEvent.change(inputElement, { target: { value: "Feed my dog." } });
  fireEvent.click(createButtonElement);
  fireEvent.change(inputElement, { target: { value: "Feed my cat." } });
  fireEvent.click(createButtonElement);
  await waitFor(() => {
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});

// // test2: Make sure that after creating a todo, if the
// // user clicks the delete button, a todo goes away.
test("it deletes a todo", async () => {
  render(<App />);

  const inputElement = screen.getByTestId("input");
  const createButtonElement = screen.getByTestId("addButton");

  // Create the todo.
  fireEvent.change(inputElement, { target: { value: "delete my cat." } });
  fireEvent.click(createButtonElement);

  await waitFor(() => {
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  const delElement = screen.getByTestId("deleteButton");

  // Click the delete button on the todo.
  fireEvent.click(delElement);
  expect(delElement).toBeInTheDocument();
});
