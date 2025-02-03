"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import Loader from "./components/Loader";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();  // Prevent the default form submission

    try {


      if (userName !== '' && email !== '') {
        setIsLoading(true);  // Set loading state to true

        // Store user details securely (consider alternatives to localStorage for production)
        localStorage.setItem('username', userName);
        localStorage.setItem('email', email);

        // Navigate to the homepage or desired route after successful login
        router.push('/homecontent');
      }
      else {
        toast.error('All Field are required');
      }

    } catch (error) {
      console.error('Error during login:', error);
      // Handle error (showing user-friendly message, etc.)
    } finally {
      setIsLoading(false);  // Ensure loading state is reset after the operation
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {isLoading && <Loader />}

      {/* Left Section - Image */}
      <div className="hidden w-1/2 bg-white-100 lg:block">
        <Image
          src="/images/meet_image.jpg"
          width={1080}
          height={1080}
          alt="login_image"
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Right Section - Login */}
      <div className="flex flex-col justify-center w-full p-8 lg:w-1/2">
        <div className="max-w-md mx-auto">
          <div class="flex flex-col items-center justify-center text-center">
            <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="35" cy="50" r="30" fill="#6f85c3" />
              <circle cx="65" cy="50" r="30" fill="#aac0e4" opacity="0.8" />
              <path d="M37 42l6 6-6 6" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" />
              <path d="M63 58l-6-6 6-6" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" />
            </svg>
          </div>

          <h1 className="mb-4 text-4xl font-bold">Welcome to TeamSync</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-100">
            Seamless Collaboration, Anytime, Anywhere
          </p>

          {/* Login Button */}
          <div className="space-y-4">
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              className={`w-full border border-gray-300 px-3 py-2 bg-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 `}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              id="email"
              type="text"
              placeholder="Enter your Email"
              className="w-full border border-gray-300 px-3 py-2 bg-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              className="w-full bg-black text-white"
              variant="outline"
              onClick={handleLogin}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
