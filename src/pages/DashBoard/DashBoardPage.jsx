import DashBoardCard from "./DashBoardCard";
import Header from "../../components/Header";
const DashBoardPage = () => {
  return (
    <div>
      <Header />
      <main className=" lg:mt-4 mt-2 md:mx-24 mx-2">
        <div className=" flex flex-col items-center justify-center">
          <div className="title mt-8 mb-2 text-2xl"> Dashboard</div>
          <div className="line h-[2px] w-[20%] bg-blue-500 mb-12"></div>
        </div>

        <div className="orderWrapper p-4 border-2 border-slate-700 rounded-lg w-[70%] mx-auto">
          <div className="orderIdTotal flex justify-between">
            <h1>order id: 123456789</h1>
            <h1>total: $123</h1>
          </div>
          <DashBoardCard />
        </div>
      </main>
    </div>
  );
};

export default DashBoardPage;
