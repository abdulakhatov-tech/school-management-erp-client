import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type EventModalType = "event";
export type EventModalActionType = "add" | "edit" | "delete";

interface IInitialState {
  dataId: string | null;
  modalType: EventModalType | null;
  actionType: EventModalActionType | null;
}

const initialState: Readonly<IInitialState> = {
  modalType: null,
  dataId: null,
  actionType: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setEventFormModal: (
      state,
      action: PayloadAction<{
        modalType: EventModalType;
        actionType: EventModalActionType;
        dataId?: string;
      }>
    ) => {
      state.modalType = action.payload.modalType;
      state.actionType = action.payload.actionType;
      state.dataId = action.payload.dataId ?? null;
    },
    resetEventFormModal: (state) => {
      state.modalType = null;
      state.actionType = null;
      state.dataId = null;
    },
  },
});

export const { setEventFormModal, resetEventFormModal } = modalSlice.actions;

export default modalSlice.reducer;
