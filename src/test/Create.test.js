import { combineReducers, createStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import userDetailReducer from "../features/userDetailSlice";
import Create from "../pages/Create";

describe("Create Component", () => {
  let store;

  beforeEach(() => {
    store = createStore(combineReducers({ app: userDetailReducer }));
  });

  test("Submitting form dispatches createUser action", async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Create />
      </Provider>
    );

    fireEvent.change(getByPlaceholderText("Enter First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(getByPlaceholderText("Enter Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(getByPlaceholderText("Enter Age"), {
      target: { value: "30" },
    });

    fireEvent.click(getByText("Submit"));
  });
});
