"use client";

import { useState } from "react";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import {
  PackageIcon,
  TrolleyIcon,
  HomeIcon,
  CheckmarkCircleIcon,
  PinIcon,
} from "@sanity/icons";
import { MenuIcon, XIcon } from "lucide-react";
import useBasketStore from "@/store/store";
import JumeiraLogo from "./ui/jumeira.png";

function Header() {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2 relative">
      <div className="flex w-full justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-green-500 hover:opacity-50 cursor-pointer"
        >
          <Image
            src={JumeiraLogo}
            alt="Falcon Logo"
            width={200}
            height={50}
            className="hover:opacity-70 transition"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex gap-9 text-[20px] flex-1 justify-center">
          <Link
            href="/"
            className="px-3 py-2 rounded-md text-gray-700 hover:text-yellow-500 hover:bg-yellow-50 flex items-center gap-2"
          >
            <HomeIcon className="w-6 h-6" />
            Home
          </Link>
          <Link
            href="#"
            className="px-3 py-2 rounded-md text-gray-700 hover:text-yellow-500 hover:bg-yellow-50 flex items-center gap-2"
          >
            <CheckmarkCircleIcon className="w-6 h-6" />
            Reviews
          </Link>
          <Link
            href="/terms-of-service"
            className="px-3 py-2 rounded-md text-gray-700 hover:text-yellow-500 hover:bg-yellow-50 flex items-center gap-2"
          >
            <PinIcon className="w-6 h-6" />
            Terms Of Service
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Hamburger (mobile only) */}
          <button
            className="sm:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>

          {/* Desktop basket + user */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/basket"
              className="relative flex items-center space-x-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              <TrolleyIcon className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            </Link>

            <ClerkLoaded>
              <SignedIn>
                <Link
                  href="/orders"
                  className="relative flex items-center space-x-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  <PackageIcon className="w-6 h-6" />
                  <span>My Orders</span>
                </Link>
              </SignedIn>

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
                    <button className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition">
                      Existing user? Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              )}
            </ClerkLoaded>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md sm:hidden flex flex-col gap-2 p-4 text-[18px] z-50">
          <Link
            href="/"
            className="px-3 py-2 rounded-md text-gray-700 hover:text-green-500 hover:bg-green-50 flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <HomeIcon className="w-6 h-6" />
            Home
          </Link>
          <Link
            href="#"
            className="px-3 py-2 rounded-md text-gray-700 hover:text-green-500 hover:bg-green-50 flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <CheckmarkCircleIcon className="w-6 h-6" />
            Reviews
          </Link>
          <Link
            href="/terms-of-service"
            className="px-3 py-2 rounded-md text-gray-700 hover:text-green-500 hover:bg-green-50 flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <PinIcon className="w-6 h-6" />
            Terms Of Service
          </Link>

          {/* Basket in mobile menu */}
          <Link
            href="/basket"
            className="relative flex items-center space-x-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setMenuOpen(false)}
          >
            <TrolleyIcon className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
          </Link>

          {/* Auth buttons in mobile menu */}
          <ClerkLoaded>
            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}!</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
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
          </ClerkLoaded>
        </div>
      )}
    </header>
  );
}
export default Header;
