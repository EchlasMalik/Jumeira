import Form from "next/form";
import BlackFridayBanner from "./BlackFridayBanner";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";

async function Hero() {
  return (
    <section className="relative flex flex-col md:flex-row items-center px-6 py-24 bg-gradient-to-l from-yellow-500 via-yellow-200 to-white gap-12">
      
      {/* Left Side: Text + Form */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900">
          Welcome to <span className="text-yellow-500">Jumeira!</span>
        </h1>
        <h4 className="text-2xl md:text-3xl font-extrabold text-gray-800">
          Award winning restaurant<span className="text-yellow-500"> in Kent!</span>
        </h4>
        <p className="text-gray-600 max-w-lg">
          Reigniting taste temptation with intriguing Indian flavours.
        </p>

        {/* Search Bar */}
        <Form action="/search" className="w-full max-w-md mt-4">
          <div className="relative w-full">
            <input
              type="text"
              name="query"
              placeholder="Search..."
              className="bg-gray-100 text-gray-800 px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 border w-full shadow-sm"
            />
            <SearchIcon className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </Form>
      </div>

      {/* Right Side: Banner */}
      <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
        <BlackFridayBanner />
      </div>

    </section>
  );
}

export default Hero;

