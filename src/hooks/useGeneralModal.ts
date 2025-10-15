import { ModalType } from "@/types";
import { create } from "zustand";

interface GeneralModalState {
  type: ModalType | null;
  visible: boolean;
  payload?: any;
  onConfirm?: () => void;
  onCancel?: () => void;
  open: (
    type: ModalType,
    options?: {
      payload?: any;
      onConfirm?: () => void;
      onCancel?: () => void;
    }
  ) => void;
  close: () => void;
  setType: (type: ModalType) => void;
  showModal: () => void;
}

export const useGeneralModal = create<GeneralModalState>((set) => ({
  type: null,
  visible: false,
  payload: undefined,
  onConfirm: undefined,
  onCancel: undefined,
  setType: (type) => set({ type: type }),
  open: (type, options) =>
    set({
      type,
      visible: true,
      payload: options?.payload,
      onConfirm: options?.onConfirm,
      onCancel: options?.onCancel,
    }),
  close: () =>
    set({
      visible: false,
      type: null,
      payload: undefined,
      onConfirm: undefined,
      onCancel: undefined,
    }),
  showModal: () => set({ visible: true }),
}));
