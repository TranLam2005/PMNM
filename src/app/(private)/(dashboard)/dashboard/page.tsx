'use client';
import SpecificationCard from "./components/SpecificationCardProps";
import Sources_Table from "./components/SourcesTable";
import LogsTable from "./components/LogsTable";
function Dashboard() {

  return ( 
    <div className="w-full flex flex-col items-end p-3 gap-4">
      <div className="flex items-start w-full">
        <h2 className="font-bold text-[25px]">Welcome, Beginners</h2>
      </div>
      <div className="w-full flex justify-between">
        <SpecificationCard nameCard="Total Sources" value="6" imgUrl="/dashboard/sources/totalSources.png"/>
        <SpecificationCard nameCard="Inactive Sources" value="0" imgUrl="/dashboard/sources/fail.png"/>
        <SpecificationCard nameCard="Active Sources" value="6" imgUrl="/dashboard/sources/success.png"/>
      </div>
      <Sources_Table />
      <LogsTable />
    </div>
   );
}

export default Dashboard;