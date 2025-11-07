import { CellComponentPropsMap, CellComponentRegistry, CellConfig } from "./registry";

interface AutoCellRendererProps<T> {
  config: CellConfig;
  value: unknown;
  normalizedValue: string;
  row: T;
  accessorKey: keyof T;
  onAction?: (action: string, row: T) => void;
  onChange?: (row: T, accessorKey: keyof T, value: T[keyof T]) => void;
  onUpdate?: (oldRow: T, newRow: T) => void;
}

export const AutoCellRenderer = <T,>({
  config,
  value,
  normalizedValue,
  row,
  accessorKey,
  onAction,
  onChange,
}: AutoCellRendererProps<T>) => {
  switch (config.component) {
    case "ActionCell":
      return <CellComponentRegistry.ActionCell {...config.props} row={row} onAction={onAction} />;
    case "PackageCell":
      return <CellComponentRegistry.PackageCell {...config.props} value={value as string} />;
    case "Status":
      return (
        <CellComponentRegistry.Status
          {...config.props}
          value={value as CellComponentPropsMap["Status"]["value"]}
        />
      );
    case "DateTimeCell":
      return (
        <CellComponentRegistry.DateTimeCell
          {...config.props}
          value={value as CellComponentPropsMap["DateTimeCell"]["value"]}
        />
      );
    case "ActorCell":
      return (
        <CellComponentRegistry.ActorCell
          {...config.props}
          value={value as CellComponentPropsMap["ActorCell"]["value"]}
        />
      );
  }
};
