import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <>
      <div className="border border-2 border-amber-600 w-40  mx-auto mt-40 flex justify-center items-center cursor-pointer">
        <Link className="text-center w-full h-full px-6 py-3" to="/login">
          Login
        </Link>
      </div>
    </>
  );
};

export default WelcomePage;
