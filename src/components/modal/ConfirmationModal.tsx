"use client";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";

interface ConfirmationModalProps {
  title?: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  visible: boolean;
  toggle: () => void;
}

export default function ConfirmationModal({
  title = "Konfirmasi",
  description = "Apakah Anda yakin ingin melanjutkan?",
  onConfirm,
  onCancel,
  visible,
  toggle,
}: ConfirmationModalProps) {
  const handleCancel = () => {
    onCancel?.();
    toggle();
  };

  const handleConfirm = () => {
    onConfirm?.();
    toggle();
  };

  return (
    <Modal
      isOpen={visible}
      onClose={toggle}
      className="max-w-md p-5 rounded-lg w-full"
    >
      <h4 className="font-semibold text-gray-800 mb-4 text-title-sm dark:text-white/90">
        {title}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      <div className="flex justify-end gap-3 mt-6">
        <Button size="sm" variant="outline" onClick={handleCancel}>
          Batal
        </Button>
        <Button size="sm" onClick={handleConfirm}>
          Ya, Lanjutkan
        </Button>
      </div>
    </Modal>
  );
}
