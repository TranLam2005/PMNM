import { Wrapper } from "@/components/wrapper";
import "../../index.scss";
import { AutoTable } from "@/components/table/AutoTable";
import { useEffect, useState } from "react";
import { SourceState } from "../states/types";
import { restApi } from "@/api/restApi";
import { mockTableData } from "../states/mocks";

function Sources_Table() {
  const [sources, setSources] = useState<SourceState[]>([]);
  const [data, setData] = useState<SourceState[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchSources = async () => {
      const res = await restApi.get("/sources/all");
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
    <Wrapper className="items-center sm:items-start p-[20px] !w-full text-black">
      <div className="relative left-[-132px] sm:left-[11px] mb-[10px]">
        <span className="vertical font-bold text-[20px] text-black flex items-center">
          Nguồn dữ liệu
        </span>
      </div>
      <AutoTable 
        columns={mockTableData}
        data={data}
        pagination={pagination}
      />
    </Wrapper>
   );
}

export default Sources_Table;