"use client";

import { useState, useMemo } from "react";
import { Icon, IconName } from "@/icons/HeroIcons"; // from your earlier mapping
import { useModal } from "@/hooks/useModal";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";

interface IconSelectorModalProps {
  onSelect: (iconName: IconName) => void;
  selected: IconName | undefined;
}

export default function IconSelectorModal({
  onSelect,
  selected,
}: IconSelectorModalProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [search, setSearch] = useState("");

  const filteredIcons = useMemo(() => {
    return Object.keys(Icon).filter((name) =>
      name.toLowerCase().includes(search.toLowerCase())
    ) as IconName[];
  }, [search]);

  const handleSelect = (iconName: IconName) => {
    onSelect(iconName);
    closeModal();
  };

  return (
    <div>
      <Button size="sm" onClick={openModal}>
        {selected ? "Ganti Icon" : "Pilih Icon"}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-3xl p-5 lg:p-8"
      >
        <h4 className="font-semibold text-gray-800 mb-5 text-title-sm dark:text-white/90">
          Pilih Icon
        </h4>

        <input
          type="text"
          placeholder="Cari icon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 border rounded text-sm"
        />

        <div className="grid grid-cols-6 gap-4 max-h-[400px] overflow-y-auto">
          {filteredIcons.map((name) => {
            const IconComponent = Icon[name];
            return (
              <button
                key={name}
                onClick={() => handleSelect(name)}
                className="flex flex-col items-center gap-1 p-2 border hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <IconComponent className="w-6 h-6 text-gray-700 dark:text-white" />
                <span className="text-[7px] truncate">{name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" size="sm" onClick={closeModal}>
            Batal
          </Button>
        </div>
      </Modal>
    </div>
  );
}
