import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AnnouncementModalType = "announcement";
export type AnnouncementModalActionType = "add" | "edit" | "delete";

interface IInitialState {
  dataId: string | null;
  modalType: AnnouncementModalType | null;
  actionType: AnnouncementModalActionType | null;
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
    setAnnouncementFormModal: (
      state,
      action: PayloadAction<{
        modalType: AnnouncementModalType;
        actionType: AnnouncementModalActionType;
        dataId?: string;
      }>
    ) => {
      state.modalType = action.payload.modalType;
      state.actionType = action.payload.actionType;
      state.dataId = action.payload.dataId ?? null;
    },
    resetAnnouncementFormModal: (state) => {
      state.modalType = null;
      state.actionType = null;
      state.dataId = null;
    },
  },
});

export const { setAnnouncementFormModal, resetAnnouncementFormModal } =
  modalSlice.actions;

export default modalSlice.reducer;
