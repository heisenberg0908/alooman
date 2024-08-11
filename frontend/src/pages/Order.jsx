import { useNavigate } from "react-router-dom"
import { OrderComponent } from "../components/OrderComponent"
export const Order=()=>{
  const navigate=useNavigate()
    return <div>
            <div className="border-b bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
          <div className="text-4xl font-semibold text-yellow-600 p-3">Alooman</div>
          <div className="text-xl font-medium p-3 cursor-pointer hover:text-yellow-600" onClick={() => navigate('/orderhistory')}>Previous Orders</div>
          <div className="text-xl font-medium p-3 cursor-pointer hover:text-yellow-600" onClick={() => navigate('/addressdetails')}>Address Details</div>
        </div>
        <div className="flex items-center space-x-4">
          <div onClick={()=>navigate('/notifications')} className="p-3 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </div>
          <div onClick={() => navigate('/profile')} className="p-3 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>
        </div>
      </div>
      <div>
        <OrderComponent/>
      </div>
      </div>
}