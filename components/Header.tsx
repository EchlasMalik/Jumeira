"use client";

import { ClerkLoaded, SignedIn, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import {PackageIcon, TrolleyIcon, HomeIcon, CheckmarkCircleIcon, PinIcon} from "@sanity/icons";
import useBasketStore from "@/store/store";
import FalconLogo from "./ui/falcon-logo.png";

function Header() {
    const {user} = useUser();
    const itemCount = useBasketStore((state) =>
        state.items.reduce((total, item) => total + item.quantity, 0)
    );

    // const createClerkPasskey = async () => {
    //     try {
    //         const response = await user?.createPasskey();
    //         console.log(response);
    //     } catch (err) {
    //         console.error("Error:", JSON.stringify(err, null, 2));
    //     }
    // }

    return (
        <header className="flex flex-wrap justify-between items-center px-4 py-2">
        {/* Top Row */}

        
        <div className="flex w-full flex-wrap justify-between items-center">

            <div className="flex items-center gap-6">
                <Link 
                href="/"
                className="text-2xl font-bold text-green-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0">
                    <Image 
                        src={FalconLogo}
                        alt="Falcon Logo"
                        width={70}
                        height={20}
                        className="hover:opacity-70 transition"
                    />
                </Link>    
                <nav className="flex gap-2 sm:gap-3 text-[20px]">
                    <Link
                        href="/"
                        className="px-3 py-2 rounded-md text-gray-700 hover:text-green-500 hover:bg-green-50 transition-colors duration-200 flex items-center gap-2"
                    >
                        <HomeIcon className="w-6 h-6" />
                        Home
                    </Link>
                    <Link
                        href="#"
                        className="px-3 py-2 rounded-md text-gray-700 hover:text-green-500 hover:bg-green-50 transition-colors duration-200 flex items-center gap-2"
                    >   
                        <CheckmarkCircleIcon className="w-6 h-6" />
                        Reviews
                    </Link>
                    <Link
                        href="/terms-of-service"
                        className="px-3 py-2 rounded-md text-gray-700 hover:text-green-500 hover:bg-green-50 transition-colors duration-200 flex items-center gap-2"
                    >   
                        <PinIcon className="w-6 h-6" />
                        Terms Of Service
                    </Link>
                </nav>
            </div>

            <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
                <Link href="/basket"
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    <TrolleyIcon className="w-6 h-6" />
                    {/* Span item count once global state is implemented */}
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {itemCount}
                    </span>
                </Link>

                {/* User area */}
                <ClerkLoaded>
                    <SignedIn>
                        <Link
                            href="/orders"
                            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            <PackageIcon className="w-6 h-6" />
                            <span>My Orders</span>
                        </Link>
                    </SignedIn>

                    {/* Divider between orders and auth */}
                    <div className="h-8 border-l border-gray-600 mx-2" />

                    {user ? (
                        <div className="flex items-center space-x-2">
                            <UserButton />

                            <div className="hidden sm:block text-xs">
                                <p className="text-gray-400">Welcome Back</p>
                                <p className="font-bold">{user.fullName}!</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex space-x-2">
                            <SignInButton mode="modal">
                            <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition">
                                Existing user? Sign In
                            </button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                            <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-600 transition">
                                Sign Up
                            </button>
                            </SignUpButton>
                        </div>
                    )}

                    {/* {user?.passkeys.length === 0 && (
                        <button
                            onClick={createClerkPasskey}
                            className="bg-white hover:bg-green-700 hover:text-white animate-pulse text-green-500 font-bold py-2 px-4 rounded border-green-300 border"
                        >
                            Create passkey
                        </button>
                    )} */}
                </ClerkLoaded>
            </div>
        </div>
        </header>
    );
  
}
export default Header
