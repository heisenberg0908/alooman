import { useState } from "react";
import { Button } from "../components/Button";
import { InputBar } from "../components/InputBar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/signup', {
        firstName,
        lastName,
        userName,
        password
      });
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      navigate('/order');
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong, please try again.');
      console.error('Something happened, try again', error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="border-b rounded-xl flex p-4 justify-between w-full max-w-4xl">
        <div className="text-4xl font-semibold text-yellow-600">Alooman</div>
        <div className="p-2">
          <Button
            onClick={() => navigate("/signin")}
            placeholder={"SignIn"}
          />
        </div>
      </div>
      <div className="w-full max-w-md mt-8 p-6 bg-white shadow-md rounded-md">
        <div className="text-3xl text-yellow-600 font-semibold flex justify-center mb-4">
          SignUp
        </div>
        <div className="space-y-4">
          <InputBar
            onChange={(e) => setFirstName(e.target.value)}
            label={"First Name"}
            placeholder={" eg: John"}
          />
          <InputBar
            onChange={(e) => setLastName(e.target.value)}
            label={"Last Name"}
            placeholder={" eg: Cena"}
          />
          <InputBar
            onChange={(e) => setUserName(e.target.value)}
            label={"Username"}
            placeholder={" eg: john@gmail.com"}
          />
          <InputBar
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            placeholder={" eg: John@1234"}
            type="password"
          />
        </div>
        <div className="mt-6 flex flex-col justify-center items-center">
          <Button
            onClick={handleSignup}
            placeholder={"Sign Up"}
          />
        <div className='flex justify-center p-2 font-semibold text-md text-slate-700'>
              Already signed up? 
          <a href='http://localhost:5173/signin' className='ml-2 text-yellow-600 hover:text-yello-800 transition-colors duration-200'>Signin</a>
        </div>
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
};