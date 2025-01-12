import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ClassModalType = "class";
export type ClassModalActionType = "add" | "edit" | "delete";

interface IInitialState {
  dataId: string | null;
  modalType: ClassModalType | null;
  actionType: ClassModalActionType | null;
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
    setClassFormModal: (
      state,
      action: PayloadAction<{
        modalType: ClassModalType;
        actionType: ClassModalActionType;
        dataId?: string;
      }>
    ) => {
      state.modalType = action.payload.modalType;
      state.actionType = action.payload.actionType;
      state.dataId = action.payload.dataId ?? null;
    },
    resetClassFormModal: (state) => {
      state.modalType = null;
      state.actionType = null;
      state.dataId = null;
    },
  },
});

export const { setClassFormModal, resetClassFormModal } = modalSlice.actions;

export default modalSlice.reducer;
