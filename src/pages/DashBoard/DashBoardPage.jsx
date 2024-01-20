import DashBoardCard from "./DashBoardCard";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const DashBoardPage = () => {
  const [userData, setUserData] = useState({});
  const user = useSelector((state) => state.user);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch(`${backendUrl}/userDetails/${user.id}`);
      const data = await response.json();
      setUserData(data);
    };
    fetchUserDetails();
  }, []);

  return (
    <div>
      <Header />
      <main className=" lg:mt-4 mt-2 md:mx-24 mx-2">
        <div className=" flex flex-col items-center justify-center">
          <div className="title mt-8 mb-2 text-2xl"> Dashboard</div>
          <div className="line h-[2px] w-[20%] bg-blue-500 mb-12"></div>
        </div>
        {userData.order !== "" &&
          userData.order !== null &&
          userData.order !== undefined && (
            <div className="orderWrapper p-4 border-2 border-slate-700 rounded-lg w-[100%] lg:w-[70%] mx-auto my-4">
              <div className="orderIdTotal flex justify-between mb-6">
                <h1 className="text-lg">Date: {userData.orderDate} </h1>
                <h1 className="text-xl">Total: $128 </h1>
              </div>
              {userData.order &&
                userData.order.map((item) => (
                  <DashBoardCard key={item} itemId={item} />
                ))}
            </div>
          )}

        {userData &&
          userData.oldOrders &&
          userData.oldOrders.map(
            (order) =>
              order.items &&
              order.items.length > 0 && (
                <div
                  key={order._id}
                  className="orderWrapper p-4 border-2 border-slate-700 rounded-lg w-[100%] lg:w-[70%] mx-auto my-4"
                >
                  <div className="orderIdTotal flex justify-between mb-6">
                    <h1 className="text-lg">Order ID: {order.date}</h1>
                    <h1 className="text-xl">Total: ${order.total}</h1>
                  </div>
                  {order.items &&
                    order.items.map((item) => (
                      <DashBoardCard key={item} itemId={item} />
                    ))}
                </div>
              )
          )}
      </main>
    </div>
  );
};

export default DashBoardPage;
