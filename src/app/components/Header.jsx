"use client";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOut, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const Header = () => {
    const router = useRouter();

    // Retrieve username and email from localStorage
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    const [open, setOpen] = useState(false);

    const formateDateTime = () => {
        const now = new Date();
        return now.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    };

    useEffect(() => {
        // If username or email is not found, redirect to user-auth page
        if (!username || !email) {
            router.push('/');
        }
    }, [username, email, router]);

    const usePlaceHolder = username ? username.charAt(0).toUpperCase() : '';

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        router.push('/');
    };

    return (
        <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
            <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-2">
                    <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="35" cy="50" r="30" fill="#6f85c3" />
                        <circle cx="65" cy="50" r="30" fill="#aac0e4" opacity="0.8" />
                        <path d="M37 42l6 6-6 6" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
                        <path d="M63 58l-6-6 6-6" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
                    </svg>
                    <span className="hidden md:block text-xl font-semibold text-gray-800 dark:text-white">
                        TeamSync
                    </span>
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-md text-gray-500 dark:text-gray-200">{formateDateTime()}</span>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarFallback className="text-lg dark:bg-gray-300">{usePlaceHolder}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-gray-800 dark:text-white">
                                {email}
                            </span>
                            <Button className="rounded-full p-4" variant="ghost" size="icon" onClick={() => setOpen(false)}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                        <div className="flex flex-col items-center mb-4">
                            <Avatar className="cursor-pointer">
                                <AvatarFallback className="text-2xl dark:bg-gray-300">{usePlaceHolder}</AvatarFallback>
                            </Avatar>
                            <h1 className="text-xl font-semibold mt-2">Hi, {username}</h1>
                        </div>
                        <div className="flex mb-4">
                            <Button className="w-full h-14 dark:border-white" variant="outline" onClick={handleLogout}>
                                <LogOut /> Logout
                            </Button>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default Header;
