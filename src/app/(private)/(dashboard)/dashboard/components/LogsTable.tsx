import { Wrapper } from "@/components/wrapper";
import "../../index.scss";
import { useEffect, useState } from "react";
import { restApi } from "@/api/restApi";
import { LogsState } from "../states/types";
import { AutoTable } from "@/components/table/AutoTable";
import { mockTableLogs } from "../states/mocks";

function LogsTable() {
  const [sources, setSources] = useState<LogsState[]>([]);
    const [data, setData] = useState<LogsState[]>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
  
    useEffect(() => {
      const fetchSources = async () => {
        const res = await restApi.get("/logs/ingest-logs");
        setSources(res.data);
      };
      fetchSources();
    }, []);
  
    useEffect(() => {
      const fetchData = async () => {
        const start = pageIndex * pageSize;
        const end = start + pageSize;
        const paginated = sources.slice(start, end);
        setData(paginated);
      };
      fetchData();
    }, [pageIndex, pageSize, sources]);
  
    const handlePageChange = (index: number) => {
      setPageIndex(index);
    };
  
    const handlePageSizeChange = (size: number) => {
      setPageSize(size);
    };
  
    const pagination = {
      pageIndex,
      pageSize,
      totalCount: sources.length,
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
    };

  return ( 
    <Wrapper className="items-center sm:items-start p-[20px] w-full! text-black">
      <div className="relative left-[-132px] sm:left-[11px] mb-[10px]">
        <span className="vertical font-bold text-[20px] text-black flex items-center">
          Thông tin nhật ký
        </span>
      </div>
      <AutoTable 
        columns={mockTableLogs}
        data={data}
        pagination={pagination}
      />
    </Wrapper>
   );
}

export default LogsTable;