import { ComponentType } from "react";

export type NavItem = {
  name: string;
  icon: ComponentType<any>;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

export enum ModalType {
  LOADING,
  ADD_ROLE,
  CONFIRMATION,
}
