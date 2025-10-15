"use client";
import React from "react";
import { Modal } from "../ui/modal";

type TLoadingModal = {
  visible: boolean;
  toggle: () => void;
};

export default function LoadingModal(props: TLoadingModal) {
  return (
    <Modal
      isOpen={props.visible}
      onClose={props.toggle}
      showCloseButton={false}
      isFullscreen={false}
      dismissable={false}
      className="w-14 h-14 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg"
    >
      <div className="w-10 h-10 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    </Modal>
  );
}
