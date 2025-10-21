import { FieldType } from "@/constants";

export const normalizeFieldType = (raw: number): FieldType => {
  if (raw in FieldType) return raw as FieldType;
  return FieldType.Text; // fallback
};
