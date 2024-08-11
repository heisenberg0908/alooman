import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { InputBar } from "../components/InputBar";
import { Button } from "../components/Button";

export const Address = () => {
    const [addressDetails, setAddressDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAddressDetails = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/users/getaddressdetails');
                const address = response.data;
                if (address) {
                    setAddressDetails(address);
                    setCity(address.city);
                    setState(address.state);
                    setStreet(address.street);
                    setLandmark(address.landmark);
                    setZipcode(address.zipcode);
                    setPhoneNumber(address.phoneNumber);
                }
            } catch (error) {
                console.error(error);
                setError("An error occurred, please try again!");
            }
        };

        fetchAddressDetails();
    }, []);

    const handleEdit = () => {
        setIsEditing(true); // Set editing mode to true when user clicks the edit icon
    };
    
    const handleSave = async () => {
        try {
            const response = await axios.put('http://localhost:3000/api/v1/users/editaddressdetails', {
                street,
                state,
                city,
                zipcode,
                landmark,
                phoneNumber
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
                }
            });
    
            if (response.status === 200) {
                setSuccess("Details edited successfully");
                setError(null);
                setIsEditing(false); // Set editing mode to false after successful save
                setAddressDetails({
                    street,
                    state,
                    city,
                    zipcode,
                    landmark,
                    phoneNumber
                });
            }
        } catch (error) {
            console.error(error);
            setSuccess(null);
            setError("An error occurred, please try again!");
        }
    };



    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="border-b bg-white shadow-sm p-4 w-full flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="text-4xl font-semibold text-yellow-600 p-3">Alooman</div>
                    <div className="text-xl font-medium p-3 cursor-pointer hover:text-yellow-600" onClick={() => navigate('/order')}>Order Now</div>
                    <div className="text-xl font-medium p-3 cursor-pointer hover:text-yellow-600" onClick={() => navigate('/orderhistory')}>Previous Orders</div>
                </div>
                <div onClick={() => navigate('/notifications')} className="flex items-center space-x-4">
                    <div className="p-3 cursor-pointer" onClick={() => navigate('/notifications')}>
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

            <div className="text-4xl flex justify-center font-semibold text-slate-600 p-4">
                {addressDetails ? "Your Address Details" : "Add your Accurate Address details"}
            </div>

            {addressDetails && !isEditing ? (
                <div className="p-4 w-full max-w-md bg-white shadow-lg rounded-lg">
                    <div className="text-2xl font-bold flex justify-center text-yellow-600 mb-4">Your Address</div>
                    <div className="mb-2">
                        <span className="text-gray-600 font-semibold">Street:</span>
                        <span className="ml-2 text-gray-800">{addressDetails.street}</span>
                    </div>
                    <div className="mb-2">
                        <span className="text-gray-600 font-semibold">City:</span>
                        <span className="ml-2 text-gray-800">{addressDetails.city}</span>
                    </div>
                    <div className="mb-2">
                        <span className="text-gray-600 font-semibold">State:</span>
                        <span className="ml-2 text-gray-800">{addressDetails.state}</span>
                    </div>
                    <div className="mb-2">
                        <span className="text-gray-600 font-semibold">Zipcode:</span>
                        <span className="ml-2 text-gray-800">{addressDetails.zipcode}</span>
                    </div>
                    <div className="mb-2">
                        <span className="text-gray-600 font-semibold">Phone Number:</span>
                        <span className="ml-2 text-gray-800">{addressDetails.phoneNumber}</span>
                    </div>
                    <div className="mb-2">
                        <span className="text-gray-600 font-semibold">Landmark:</span>
                        <span className="ml-2 text-gray-800">{addressDetails.landmark}</span>
                    </div>
                    <div onClick={handleEdit} className="flex justify-end p-2 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-700 hover:text-yellow-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 0 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </div>
                </div>
            ) : (
                <>
                    <div className="p-4 w-full max-w-md">
                        <InputBar value={street} onChange={(e) => setStreet(e.target.value)} label={"House No/Street/Locality"} placeholder={"eg: House No 12, Park Road"} />
                        <InputBar value={city} onChange={(e) => setCity(e.target.value)} label={"City"} placeholder={"eg: Dehradun"} />
                        <InputBar value={state} onChange={(e) => setState(e.target.value)} label={"State"} placeholder={"eg: Uttarakhand"} />
                        <InputBar value={zipcode} onChange={(e) => setZipcode(e.target.value)} label={"ZipCode"} placeholder={"eg: 248001"} />
                        <InputBar value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} label={"Phone-Number"} placeholder={"eg: 9876765551"} />
                        <InputBar value={landmark} onChange={(e) => setLandmark(e.target.value)} label={"Landmark"} placeholder={"eg: Near xyz school."} />
                    </div>
                    <div className="p-4 flex justify-center">
                        <Button onClick={handleSave} placeholder={"Save Details"} />
                    </div>
                </>
            )}

            {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
            {success && <div className="mt-4 text-green-500 text-center">{success}</div>}
        </div>
    );
};
