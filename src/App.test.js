import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import App from "./App";
import * as React from "react";

// HACK TO MAKE CODESANDBOX WORK
import expect from "expect";
global.expect = expect;
// require('jest-dom/extend-expect');

test("TODO application is rendered", () => {
  render(<App />);
  const linkElement = screen.getByText(/MY TODO LIST/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders the correct initial DOM", () => {
  const doc = render(<App />);
  const inputElement = doc.getByTestId("input");
  // The input should be blank.
  expect(inputElement.getAttribute("value")).toBe("");
});

test("creates a new todo", async () => {
  const doc = render(<App />);

  const inputElement = doc.getByTestId("input");
  const createButtonElement = doc.getByTestId("addButton");

  // Create the todo.
  fireEvent.change(inputElement, { target: { value: "Feed my dog." } });
  fireEvent.click(createButtonElement);

  const todos = doc.getAllByTestId('TodoList');
  const todo = doc.getByTestId('todo');
  const todoNameElement = todo.lastChild;
 
 console.log('everfirst chileything',todoNameElement);
  // The name should be in the document as "Feed my dog."
  expect(todoNameElement).toBeInTheDocument();
  expect(todoNameElement).toHaveTextContent("Feed my dog.");

});

// // test2: Make sure that after creating a todo, if the
// // user clicks the delete button, a todo goes away.
// test("it deletes a todo", () => {
//   const doc = render(<App />);

//   const inputElement = doc.getByTestId("input");
//   const createButtonElement = doc.getByTestId("addButton");

//   // Create the todo.
//   fireEvent.change(inputElement, { target: { value: "Feed my cat." } });
//   fireEvent.click(createButtonElement);

//   // Get the newly created todo.
//   const todo = doc.queryByTestId("todo");

//   // Click the delete button on the todo.
//   const todoDeleteButton = doc.getByTestId("deleteButton");
//   fireEvent.click(todoDeleteButton);

// });
