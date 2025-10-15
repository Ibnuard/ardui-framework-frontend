"use client";

import { ModalType } from "@/types";
import LoadingModal from "./LoadingModal";
import ConfirmationModal from "./ConfirmationModal";

type TGeneralModalSelector = {
  type: ModalType | null;
  visible: boolean;
  toggle: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export default function GeneralModalSelector({
  type,
  visible,
  toggle,
  onConfirm,
  onCancel,
}: TGeneralModalSelector) {
  if (!visible) return;

  if (type == ModalType.LOADING) {
    return <LoadingModal visible={visible} toggle={toggle} />;
  }

  if (type == ModalType.CONFIRMATION) {
    return (
      <ConfirmationModal
        visible={visible}
        toggle={toggle}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );
  }
}
