import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';

export const Notification = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/users/notifications');
                setNotifications(response.data.notifications);
                setError("");
            } catch (error) {
                console.error("Error fetching notifications:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50">
            <div className="border-b bg-white shadow-sm p-4 w-full flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="text-4xl font-semibold text-yellow-600 p-3">Alloman</div>
                    <div className="text-xl font-medium p-3 cursor-pointer hover:text-yellow-600" onClick={() => navigate('/order')}>Order Now</div>
                    <div className="text-xl font-medium p-3 cursor-pointer hover:text-yellow-600" onClick={() => navigate('/orderhistory')}>Previous Orders</div>
                </div>
                <div onClick={() => navigate('/profile')} className="p-3 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
            </div>
            <div className="text-4xl font-semibold text-slate-600 p-4">Your Notifications</div>
            <div className="p-4 w-full flex flex-col items-center">
                {loading ? (
                    <p className="font-serif text-xl font-normal text-slate-700">Loading...</p>
                ) : error ? (
                    <p className="font-serif text-xl font-normal text-red-600">{error}</p>
                ) : (
                    notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div key={notification._id} className="w-full max-w-2xl p-4 mb-4 border rounded shadow-sm bg-white">
                                <p className=" text-xl font-medium text-slate-600">{notification.message}</p>
                                <p className="font-sans text-sm text-gray-500">{format(new Date(notification.createdAt), 'PPPpp')}</p>
                            </div>
                        ))
                    ) : (
                        <p className="font-serif text-xl font-normal text-slate-700">No notifications found</p>
                    )
                )}
            </div>
        </div>
    );
};
