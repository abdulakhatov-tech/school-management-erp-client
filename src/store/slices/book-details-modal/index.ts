import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  open: boolean;
}

const initialState: IInitialState = {
  open: false,
};

const modalSlice = createSlice({
  name: "book-details-modal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.open = !state.open;
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
