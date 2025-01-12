// src/components/Navbar.tsx

import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 text-xl font-bold">Online Judge</div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/addProblem"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  addProblem
                </Link>
                <Link
                  to="/problemList"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  problemList
                </Link>
                <Link
                  to="/compiler"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  compiler
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
