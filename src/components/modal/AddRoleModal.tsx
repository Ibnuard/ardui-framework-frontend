"use client";
import { useAddRole } from "@/hooks/useRole";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { useState } from "react";
import { useAlert } from "@/context/AlertContext";

export default function AddRoleModal({
  visible,
  toggle,
  saveResult,
}: {
  visible: boolean;
  toggle: () => void;
  saveResult: (result: "SUCCESS" | "FAILED") => void;
}) {
  const { loading, data, fetchData, error } = useAddRole();
  const [name, setName] = useState<string>("");

  async function handleOnSave() {
    await fetchData({ name: name });

    if (!error) {
      toggle();
      saveResult("SUCCESS");
    } else {
      saveResult("FAILED");
    }
  }

  return (
    <Modal
      isOpen={visible}
      onClose={loading ? () => {} : toggle}
      className="max-w-[584px] p-5 lg:p-10"
    >
      <div>
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
          Tambah Role
        </h4>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="col-span-2">
            <Label>Nama Role</Label>
            <Input
              type="text"
              disabled={loading}
              placeholder="contoh: 'SuperAdmin' atau 'User'"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-end w-full gap-3 mt-6">
          <Button
            disabled={loading}
            size="sm"
            variant="outline"
            onClick={toggle}
          >
            Batalkan
          </Button>
          <Button disabled={loading} size="sm" onClick={handleOnSave}>
            Simpan
          </Button>
        </div>
      </div>
    </Modal>
  );
}
