import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <header className="flex border-b p-4 justify-between bg-white shadow-sm">
        <div className="text-4xl font-bold text-yellow-600">Alooman</div>
        <div className="flex">
          <div className="p-2">
            <Button onClick={() => navigate('/signup')} placeholder={"Sign Up"} />
          </div>
          <div className="p-2">
            <Button onClick={() => navigate('/signin')} placeholder={"Sign In"} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className=" p-6">
        <section className="text-center">
          <h1 className="text-6xl text-slate-600 p-4 font-semibold">Welcome to Alooman</h1>
          <p className="text-4xl font-normal p-4 text-slate-600 mt-2">Fresh Potatoes Delivered to Your Doorstep!</p>
          <p className="text-xl font-normal text-slate-600 mt-4">
          At Alooman, we are committed to bringing you the freshest and highest quality potatoes right to your home. Our mission is to make sure you never run out of this essential ingredient for your favorite dishes. Whether you need potatoes for your daily meals or for a special occasion, we've got you covered!
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-4xl text-slate-600 font-semibold">Why Choose Alooman?</h2>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li className="text-xl text-slate-600 font-md"><b>Quality You Can Trust:</b> We source only the best potatoes from trusted farms.</li>
            <li className="text-xl text-slate-600 font-md"><b>Convenient Delivery: </b> Enjoy the ease of having potatoes delivered straight to your door.</li>
            <li className="text-xl text-slate-600 font-md"><b>Affordable Prices: </b> Get great quality potatoes at competitive prices.</li>
            <li className="text-xl text-slate-600 font-md"><b>Easy Ordering:</b> Our user-friendly app makes ordering simple and hassle-free.</li>
            <li className="text-xl text-slate-600 font-md"><b>Customer Support: </b> We're here to help with any questions or concerns, 24/7.</li>
          </ul>
        </section>

        <section className="mt-8 text-center">
          <h2 className="text-4xl p-2 text-slate-600 font-semibold">Order Now</h2>
          <div className="p-4">
          <Button className="mt-4 p-3" onClick={() => navigate('/signup')} placeholder={"Order Now"} />
          </div>
          <img
            className="mt-6 w-full max-w-4xl mx-auto"
            src="https://images.unsplash.com/photo-1596910547037-846b1980329f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90YXRvfGVufDB8fDB8fHww"
            alt="Blogify"
          />
        </section>

        <section className="mt-8">
          <p className="text-4xl font-semibold text-slate-600 text-center">
          How It Works

          </p>
          <ul className="list-disc list-inside mt-4 pl-4 space-y-2">
            <li className="text-xl text-slate-600 font-normal"><b>Browse Our Selection:</b> Explore our variety of potatoes and select the ones you want.</li>
            <li className="text-xl text-slate-600 font-normal"><b>Place Your Order:</b> Add your chosen potatoes to your cart and proceed to checkout.</li>
            <li className="text-xl text-slate-600 font-normal"><b>Fast Delivery:</b> Sit back and relax while we deliver your order to your specified address.</li>
          </ul>
        </section>

        <section className="mt-8 text-center">
          <h2 className="text-4xl text-slate-600 font-semibold">Join the Alooman Community</h2>
          <div className="p-4">
          <Button className="mt-4" onClick={() => navigate('/signup')} placeholder={"Start Now"} />
          </div>
          
          <p className="mt-6 text-xl text-slate-600 font-normal">
          Stay updated with our latest offers and promotions by subscribing to our newsletter. Follow us on social media to see how others are enjoying their Alloman potatoes!
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-600">Join us and become part of a community where every story matters.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t p-4 bg-yellow-600">
        <div className="flex flex-col items-center">
          <div className="text-5xl text-white font-semibold">Alooman</div>
          <div className="text-xl text-white font-normal">All rights reserved &copy; 2024</div>
        </div>
      </footer>
    </div>
  );
};