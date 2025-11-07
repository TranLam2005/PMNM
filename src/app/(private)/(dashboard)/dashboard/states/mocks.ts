import { ColumnConfig } from "@/components/table/registry";

export const mockTableData: ColumnConfig[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "kind", header: "Kind" },
  { accessorKey: "url", header: "URL" },
  { accessorKey: "owner", header: "Nguồn" },
  { accessorKey: "license", header: "Giấy phép" },
  { accessorKey: "update_frequency", header: "Tần suất cập nhật" },
  { 
    accessorKey: "created_at",
    header: "Ngày tạo",
    cell: {
      component: "DateTimeCell",
      props: {},
    }
  },
]

export const mockTableLogs: ColumnConfig[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "source_key", header: "Giai đoạn" },
  { accessorKey: "log", header: "Nội dung" },
]