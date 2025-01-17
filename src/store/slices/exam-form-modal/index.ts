import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ExamModalType = "exam";
export type ExamModalActionType = "add" | "edit" | "delete";

interface IInitialState {
  dataId: string | null;
  modalType: ExamModalType | null;
  actionType: ExamModalActionType | null;
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
    setExamFormModal: (
      state,
      action: PayloadAction<{
        modalType: ExamModalType;
        actionType: ExamModalActionType;
        dataId?: string;
      }>
    ) => {
      state.modalType = action.payload.modalType;
      state.actionType = action.payload.actionType;
      state.dataId = action.payload.dataId ?? null;
    },
    resetExamFormModal: (state) => {
      state.modalType = null;
      state.actionType = null;
      state.dataId = null;
    },
  },
});

export const { setExamFormModal, resetExamFormModal } = modalSlice.actions;

export default modalSlice.reducer;
