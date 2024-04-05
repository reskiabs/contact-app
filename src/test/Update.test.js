import { combineReducers, createStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import userDetailReducer from "../features/userDetailSlice";
import Update from "../pages/Update";

describe("Update Component", () => {
  let store;

  beforeEach(() => {
    store = createStore(combineReducers({ app: userDetailReducer }));
  });

  test("Updating user dispatches updateUser action", async () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: jest.fn().mockReturnValue({ id: "1" }),
    }));

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Update />
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

    fireEvent.click(getByText("Save Changes"));
  });
});
