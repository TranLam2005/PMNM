import Banner from "./components/banner/Banner";
import WorkSteps from "./components/workSteps/WorkSteps";

function Home() {
  return ( 
    <div className="w-full min-h-screen flex flex-col items-center">
     <Banner /> 
     <WorkSteps />
    </div>
   );
}

export default Home;