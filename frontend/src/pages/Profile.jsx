import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Profile = () => {
    const navigate = useNavigate();
    const [info, setInfo] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response=await axios.get('http://localhost:3000/api/v1/users/profile')
                console.log(response.data);
                setInfo(response.data); // Update the state with the fetched data
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
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
                </div>
            </div>
            <div className="text-3xl text-slate-600 font-semibold p-4 flex justify-center">Your Personal Details</div>
            <div className="p-4">
                {loading ? (
                    <p className="text-xl font-normal text-slate-700">Loading...</p>
                ) : error ? (
                    <p className="font-serif text-xl font-normal text-red-600">{error}</p>
                ) : (
                    <>
                        <p className="text-xl font-normal text-slate-700">First Name: {info.fname}</p>
                        <p className="text-xl font-normal text-slate-700">Last Name: {info.lname}</p>
                        <p className="text-xl font-normal text-slate-700">User Name: {info.userName}</p>
                    </>
                )}
            </div>
        </div>
    );
};
