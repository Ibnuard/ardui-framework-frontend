"use client";

import {
  CardMenuItem,
  ComponentCard,
  HeaderActionCard,
} from "@/components/card";
import CustomSelect from "@/components/form/CustomSelect";
import Input from "@/components/form/input/InputField";
import { useState } from "react";

export default function MenuManagement() {
  const SAMPLE_SUBMENU = [{ title: "View" }, { title: "Approval" }];

  const [selectedFruit, setSelectedFruit] = useState<string>("banana");

  const fruitOptions = [
    { value: "apple", label: "Apple 🍎" },
    { value: "banana", label: "Banana 🍌" },
    { value: "orange", label: "Orange 🍊" },
    { value: "mango", label: "Mango 🥭" },
    { value: "grape", label: "Grape 🍇" },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-132px)] gap-4 overflow-hidden">
      <HeaderActionCard title="Menu Management" showSaveButton />

      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
        {/* Kiri */}
        <ComponentCard
          className="flex flex-col h-full min-h-0"
          title="Current Menu"
        >
          <div className="flex-1 min-h-0 overflow-auto p-2 flex flex-col gap-2.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <CardMenuItem
                key={i}
                title={`Documents ${i + 1}`}
                showIcon
                subMenuList={SAMPLE_SUBMENU}
              />
            ))}
          </div>
        </ComponentCard>

        {/* Kanan */}
        <ComponentCard
          className="flex flex-col h-full min-h-0"
          title="Menu Detail"
        >
          <div className="flex flex-col gap-4">
            <Input label="Menu Name" />

            <CustomSelect
              options={fruitOptions}
              placeholder="Select a fruit"
              value={selectedFruit}
              onChange={(v) => setSelectedFruit(v)}
              hint={!selectedFruit ? "Please select one fruit" : ""}
              error={!selectedFruit}
              isSearchable
              isClearable
              label="Module"
            />

            <div>
              <ComponentCard title="Submenu">
                <div>test</div>
              </ComponentCard>
            </div>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}
