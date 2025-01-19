import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ResultModalType = "result";
export type ResultModalActionType = "add" | "edit" | "delete";

interface IInitialState {
  dataId: string | null;
  modalType: ResultModalType | null;
  actionType: ResultModalActionType | null;
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
    setResultFormModal: (
      state,
      action: PayloadAction<{
        modalType: ResultModalType;
        actionType: ResultModalActionType;
        dataId?: string;
      }>
    ) => {
      state.modalType = action.payload.modalType;
      state.actionType = action.payload.actionType;
      state.dataId = action.payload.dataId ?? null;
    },
    resetResultFormModal: (state) => {
      state.modalType = null;
      state.actionType = null;
      state.dataId = null;
    },
  },
});

export const { setResultFormModal, resetResultFormModal } = modalSlice.actions;

export default modalSlice.reducer;
