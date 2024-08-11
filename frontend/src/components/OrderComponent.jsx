import { Button } from "./Button";
import { InputBar } from "./InputBar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const OrderComponent = () => {
    const [orderQuantity, setQuantity] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleOrder = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/aloo/addorder', {
                orderQuantity
            });

            if (response.status === 200) {
                setSuccess("Your order has been placed successfully!");
                setError("");

                // Automatically navigate to /orderhistory after 2 seconds
                setTimeout(() => {
                    navigate('/orderhistory');
                }, 2000);
            } else {
                setSuccess("");
                setError("An error occurred, please try again!");
            }
        } catch (error) {
            console.error(error);
            setSuccess("");
            setError("An error occurred, please try again!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <div className="border-b p-4 w-full max-w-2xl bg-white shadow-sm rounded-lg">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="w-full lg:w-1/3 flex justify-center p-4">
                        <img
                            src="https://media.istockphoto.com/id/157430678/photo/three-potatoes.jpg?s=612x612&w=0&k=20&c=qkMoEgcj8ZvYbzDYEJEhbQ57v-nmkHS7e88q8dv7TSA="
                            alt="Pahadi Potato"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="w-full lg:w-2/3 p-4">
                        <div className="text-2xl text-slate-600 font-semibold text-center lg:text-left mb-4">
                            Pahadi Potato | 10 Rupees/Kg
                        </div>
                        <InputBar
                            onChange={(e) => setQuantity(e.target.value)}
                            label={"Enter How much you want to order! (In Kilograms)"}
                            placeholder={"e.g: 1, 2, 3..."}
                        />
                        <div className="flex justify-center lg:justify-start mt-6">
                            <Button onClick={handleOrder} placeholder={"Order Now"} />
                        </div>
                        {error && (
                            <div className="mt-4 text-red-500 text-center lg:text-left">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="mt-4 text-green-500 text-center lg:text-left">
                                {success}
                                <div className="mt-4 flex justify-center lg:justify-start">
                                    <Button onClick={() => navigate('/orderhistory')} placeholder={"Go to Order History"} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
