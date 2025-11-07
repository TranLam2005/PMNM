'use client';
import LineChart from "@/components/LineChart/LineChart";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Wrapper } from "@/components/wrapper";
import { Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearch } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { restApi } from "@/api/restApi";
import { StatCard } from "./components/StatCard";
import { Suspense } from "react";
import Loading from "@/components/loading";

function SearchComponent() {
  const [data, setData] = useState();
  const sp = useSearchParams();
  const router = useRouter();
  const q = sp.get("q") || "";
  const { items, loading, error } = useSearch({q});

  useEffect(() => {
    const url = `/search?q=${encodeURIComponent(q)}`;
    router.replace(url);
    const fetchData = async () => {
      const res = await restApi.get('ml/predict', {
        params: {
          city: q
        }
      })
      setData(res.data.y_pred);
    }
    fetchData();
  }, [q, router]);

  return ( 
    <div className="w-full px-[20px] min-h-screen flex flex-col items-center">
      <div className="flex items-center justify-between w-full mt-[20px] mb-[30px]">
        <h2 className="font-bold text-[30px]">DashBoard</h2>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Wrapper className="text-black rounded-md shadow-md">
        <LineChart data={items} />
      </Wrapper>
      <StatCard title="Certified Facility Rate" value={data} sub="Dự đoán chỉ số an toàn thực phẩm theo khu vực cho tháng tiếp theo" icon={Eye} />
    </div>
   );
}

function Search() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchComponent />
    </Suspense>
  )
}

export default Search;