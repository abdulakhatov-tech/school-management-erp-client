import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SubjectModalType = "subject";
export type SubjectModalActionType = "add" | "edit" | "delete";

interface IInitialState {
  dataId: string | null;
  modalType: SubjectModalType | null;
  actionType: SubjectModalActionType | null;
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
    setSubjectFormModal: (
      state,
      action: PayloadAction<{
        modalType: SubjectModalType;
        actionType: SubjectModalActionType;
        dataId?: string;
      }>
    ) => {
      state.modalType = action.payload.modalType;
      state.actionType = action.payload.actionType;
      state.dataId = action.payload.dataId ?? null;
    },
    resetSubjectFormModal: (state) => {
      state.modalType = null;
      state.actionType = null;
      state.dataId = null;
    },
  },
});

export const { setSubjectFormModal, resetSubjectFormModal } =
  modalSlice.actions;

export default modalSlice.reducer;
