import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="border-2 border-amber-600 rounded-lg w-full max-w-xs md:max-w-sm mx-auto flex justify-center items-center cursor-pointer hover:bg-amber-50 transition-colors duration-200">
          <Link className="text-center w-full h-full px-6 py-4 md:py-5 text-base md:text-lg font-semibold text-amber-700 hover:text-amber-800" to="/login">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
