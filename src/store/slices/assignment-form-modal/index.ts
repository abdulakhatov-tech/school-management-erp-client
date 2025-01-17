import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AssignmentModalType = "assignment";
export type AssignmentModalActionType = "add" | "edit" | "delete";

interface IInitialState {
  dataId: string | null;
  modalType: AssignmentModalType | null;
  actionType: AssignmentModalActionType | null;
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
    setAssignmentFormModal: (
      state,
      action: PayloadAction<{
        modalType: AssignmentModalType;
        actionType: AssignmentModalActionType;
        dataId?: string;
      }>
    ) => {
      state.modalType = action.payload.modalType;
      state.actionType = action.payload.actionType;
      state.dataId = action.payload.dataId ?? null;
    },
    resetAssignmentFormModal: (state) => {
      state.modalType = null;
      state.actionType = null;
      state.dataId = null;
    },
  },
});

export const { setAssignmentFormModal, resetAssignmentFormModal } =
  modalSlice.actions;

export default modalSlice.reducer;
