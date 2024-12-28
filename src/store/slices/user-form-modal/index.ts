import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserModalType = "admin" | "teacher" | "student" | "parent";
export type UserModalActionType = "create" | "edit" | "delete";

interface IInitialState {
  dataId: string | null;
  modalType: UserModalType | null;
  actionType: UserModalActionType | null;
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
    setUserFormModal: (
      state,
      action: PayloadAction<{
        modalType: UserModalType;
        actionType: UserModalActionType;
        dataId?: string;
      }>
    ) => {
      state.modalType = action.payload.modalType;
      state.actionType = action.payload.actionType;
      state.dataId = action.payload.dataId ?? null;
    },
    resetUserFormModal: (state) => {
      state.modalType = null;
      state.actionType = null;
      state.dataId = null;
    },
  },
});

export const { setUserFormModal, resetUserFormModal } = modalSlice.actions;

export default modalSlice.reducer;
