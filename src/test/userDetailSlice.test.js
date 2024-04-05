import { createStore } from "@reduxjs/toolkit";
import userDetailReducer, {
  createUser,
  deleteUser,
  showUser,
  updateUser,
} from "../features/userDetailSlice";

describe("userDetailSlice", () => {
  let store;

  beforeEach(() => {
    store = createStore(userDetailReducer);
  });

  test("createUser action", async () => {
    await store.dispatch(
      createUser({ firstName: "John", lastName: "Doe", age: 30 })
    );
    expect(store.getState().users).toHaveLength(1);
    // Add more assertions as needed
  });

  test("showUser action", async () => {
    await store.dispatch(showUser());
  });

  test("deleteUser action", async () => {
    await store.dispatch(
      createUser({ firstName: "John", lastName: "Doe", age: 30 })
    );
    await store.dispatch(
      createUser({ firstName: "Jane", lastName: "Doe", age: 25 })
    );

    const initialUsersCount = store.getState().users.length;
    const userToDelete = store.getState().users[0];

    await store.dispatch(deleteUser(userToDelete.id));
    expect(store.getState().users).toHaveLength(initialUsersCount - 1);
  });

  test("updateUser action", async () => {
    await store.dispatch(
      createUser({ firstName: "John", lastName: "Doe", age: 30 })
    );
    const userToUpdate = store.getState().users[0];

    await store.dispatch(updateUser({ ...userToUpdate, age: 35 }));
    expect(store.getState().users[0].age).toBe(35);
  });
});
