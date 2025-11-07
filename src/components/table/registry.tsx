import React from "react";
import { ActionCell } from "./cells/ActionCell";
import { PackageCell } from "./cells/PackageCell";
import { Status } from "./cells/StatusCell";
import { DateTimeCell } from "./cells/DateCell";
import { ActorCell } from "./cells/ActorCell";

export const CellComponentRegistry = {
  ActionCell,
  PackageCell,
  Status,
  DateTimeCell,
  ActorCell,
} as const;

export type ActionType = "edit" | "remove" | "view" | "config" | "download";
export type CellComponentRegistryMap = typeof CellComponentRegistry;
export type ComponentName = keyof CellComponentRegistryMap;

export type CellComponentPropsMap = {
  [K in keyof CellComponentRegistryMap]: React.ComponentProps<(typeof CellComponentRegistry)[K]> & {
    normalizedValue?: string;
  };
};

export type ComponentCell<K extends ComponentName> = {
  component: K;
  props: Omit<CellComponentPropsMap[K], "value" | "row" | "accessorKey">;
};

export interface ColumnConfig {
  accessorKey: string;
  header: string;
  visible?: boolean;
  cell?: CellConfig;
  meta?: MobileMeta;
}
export type CellConfig = {
  [K in ComponentName]: ComponentCell<K>;
}[ComponentName];

export type MobileMeta = {
  hideOnMobile?: boolean;
  hideHeaderMobile?: boolean;
  mobileOrder?: number;
  mobileLabel?: string;
  mobileHeaderSlot?: "leading" | "trailing";
};

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends unknown, TValue> extends MobileMeta {}
}
