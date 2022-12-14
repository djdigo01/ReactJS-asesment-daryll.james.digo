import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  error: null,
  status: null,
};

const SendingRequest = createSlice({
  name: "books_item",
  initialState,
  reducers: {
    send(state, action) {
      state.status = action.payload ? 'pending' : null;
      state.data = null;
      state.error = null;
    },
    success(state, action) {
      state.status = "completed";
      state.data = action.payload;
      state.error = null;
    },
    error(state, action) {
      state.status = "error";
      state.data = null;
      state.error = action.payload;
    },
  },
});

const store = configureStore({
  reducer: SendingRequest.reducer,
});

export const SendingRequestActions = SendingRequest.actions;
export default store;
