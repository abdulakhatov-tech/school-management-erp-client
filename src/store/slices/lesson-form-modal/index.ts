import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LessonModalType = "lesson";
export type LessonModalActionType = "add" | "edit" | "delete";

interface IInitialState {
  dataId: string | null;
  modalType: LessonModalType | null;
  actionType: LessonModalActionType | null;
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
    setLessonFormModal: (
      state,
      action: PayloadAction<{
        modalType: LessonModalType;
        actionType: LessonModalActionType;
        dataId?: string;
      }>
    ) => {
      state.modalType = action.payload.modalType;
      state.actionType = action.payload.actionType;
      state.dataId = action.payload.dataId ?? null;
    },
    resetLessonFormModal: (state) => {
      state.modalType = null;
      state.actionType = null;
      state.dataId = null;
    },
  },
});

export const { setLessonFormModal, resetLessonFormModal } = modalSlice.actions;

export default modalSlice.reducer;
