import React from "react";
import Loading from "@/components/loading";

function LoadingPage(): React.ReactNode {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Loading />
    </div>
  );
}

export default LoadingPage;
