"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export function Providers({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Check if username and email exist in localStorage
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    if (!username || !email) {
      // If not present, redirect to user-auth page
      router.push('http://localhost:3000/user-auth');
    } else {
      // If present, redirect to home page
      router.push('http://localhost:3000/');
    }
  }, [router]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </>
  );
}
