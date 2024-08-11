import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const PrevOrderComponent = ({ orderId, postedAt, orderQuantity, completed,onDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/aloo/orders/${orderId}`);
            if (response.status === 200) {
                onDelete(orderId); // Update the list in parent component
            }
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };


    const handleUpdate = () => {
        navigate(`/update-order/${orderId}`);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 m-4 max-w-md mx-auto hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="border-b pb-4 mb-4">
                <div className="text-lg text-gray-700 p-2 font-medium flex items-center">
                    <span className="font-semibold text-yellow-600">Order ID:</span>
                    <span className="ml-2">{orderId}</span>
                </div>
                <div className="text-sm text-gray-500 p-2 font-light flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2 text-yellow-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m4-2a9 9 0 1 1-8-8.96" />
                    </svg>
                    <span>{postedAt}</span>
                </div>
            </div>
            <div className="flex justify-between items-center p-2">
                <div className="flex items-center text-sm text-gray-700 font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2 text-yellow-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Quantity:</span>
                    <span className="ml-2">{orderQuantity} Kg</span>
                </div>
                <div className={`flex items-center text-sm font-semibold ${completed ? 'text-green-600' : 'text-red-600'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d={completed ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
                    </svg>
                    <span>{completed ? 'Completed' : 'Pending'}</span>
                </div>
            </div>
            <div className="flex justify-end mt-4 space-x-4">
                <button 
                    onClick={handleUpdate} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
                    Update
                </button>
                <button 
                    onClick={handleDelete} 
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200">
                    Delete
                </button>
            </div>
        </div>
    );
};
