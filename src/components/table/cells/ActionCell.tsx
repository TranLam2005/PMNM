import React, { JSX } from "react";
import { ActionType } from "../registry";
import { Download, Eye, Pencil, Settings, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export interface ActionCellProps<T> {
  actions: ActionType[];
  row: T;
  onAction?: (action: ActionType, row: T) => void;
}

const actionIconMap: Record<ActionType, React.ReactNode> = {
  view: <Eye className="w-4 h-4" />,
  edit: <Pencil className="w-4 h-4" />,
  remove: <Trash2 className="w-4 h-4" />,
  config: <Settings className="w-4 h-4" />,
  download: <Download className="w-4 h-4" />,
};

const actionLabelMap: Record<ActionType, string> = {
  view: "View",
  edit: "Edit",
  remove: "Remove",
  config: "Configure",
  download: "Download",
};

export const ActionCell = React.memo(function ActionCell<T>({
  actions,
  row,
  onAction,
}: ActionCellProps<T>) {
  return (
    <div className="flex gap-1">
      {actions.map((action: ActionType) => (
        <Tooltip key={action}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => onAction?.(action, row)}>
              {actionIconMap[action]}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">{actionLabelMap[action]}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}) as <T>(props: ActionCellProps<T>) => JSX.Element;
