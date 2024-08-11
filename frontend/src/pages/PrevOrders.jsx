import { useNavigate } from "react-router-dom";
import { PrevOrderComponent } from "../components/PrevOrderComponent";
import { useEffect, useState } from "react";
import axios from "axios";

export const PrevOrders = () => {
  const navigate = useNavigate();
  const [previousOrders, setPreviousOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/aloo/previousorders');
        const orders = response.data.previousOrders;
        setPreviousOrders(orders || []);
        console.log("Previous orders:", orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleDeleteOrder = (orderId) => {
    // Update the state to remove the deleted order
    setPreviousOrders(prevOrders => prevOrders.filter(order => order.orderId !== orderId));
  };

  return (
    <div>
      <div className="border-b bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-4xl font-semibold text-yellow-600 p-3">Alooman</div>
          <div className="text-xl font-medium p-3 cursor-pointer hover:text-yellow-600" onClick={() => navigate('/order')}>Order Now</div>
          <div className="text-xl font-medium p-3 cursor-pointer hover:text-yellow-600" onClick={() => navigate('/addressdetails')}>Address Details</div>
        </div>
        <div className="flex items-center space-x-4">
          <div onClick={() => navigate('/notifications')} className="p-3 cursor-pointer">
            {/* SVG Icon */}
          </div>
          <div onClick={() => navigate('/profile')} className="p-3 cursor-pointer">
            {/* SVG Icon */}
          </div>
        </div>
      </div>

      <div className="text-3xl font-semibold text-slate-600 p-4 flex justify-center">Previous Orders</div>

      {previousOrders.length > 0 ? 
        previousOrders.map(order => (
          <PrevOrderComponent
            key={order.orderId}
            orderId={order.orderId}
            postedAt={order.postedAt}
            orderQuantity={order.orderQuantity}
            completed={order.completed}
            onDelete={handleDeleteOrder}
          />
        )) : <div className="flex justify-center p-6 font-medium text-2xl text-slate-600">No Orders found.</div>
      }
    </div>
  );
};

