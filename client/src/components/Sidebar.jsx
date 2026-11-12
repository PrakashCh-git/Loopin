import React from "react";
import logo from "../assets/LoopinLogo.png";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import { CirclePlus } from "lucide-react";
import { LogOut, UserRound } from "lucide-react";
import axios from "axios";

const Sidebar = ({ sidebarOpen, setSidebarOpen, setIsAuthenticated }) => {
  const navigate = useNavigate();

  async function handleSignOut(e) {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true },
      );

      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Sign out failed:", err.response?.data || err.message);
    }
  }
  return (
    <div
      className={`w-60 xl:w-72 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 z-20 ${sidebarOpen ? "translate-x-0" : "max-sm:-translate-x-full"} transition-all duration-300 ease-in-out`}
    >
      <div className="w-full ">
        <img
          onClick={() => navigate("/")}
          src={logo}
          className="w-30 ml-7 my-2 cursor-pointer"
          alt=""
        />
        <hr className="border-gray-300 mb-8" />

        <MenuItem setSidebarOpen={setSidebarOpen} />

        <Link
          to="/create-post"
          className="flex items-center justify-center gap-2 py-2.5 mt-6 mx-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95 transition text-white cursor-pointer"
        >
          <CirclePlus className="w-5 h-5" />
          Create Post
        </Link>
      </div>

      <div className="w-full border-t border-gray-200 p-4">
        <div className="flex items-center justify-between gap-3">
          {/* User profile */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <UserRound className="w-5 h-5 text-indigo-600" />
            </div>

            <div className="min-w-0">
              <h1 className="text-sm font-semibold text-gray-800 truncate">
                Name
              </h1>
              <p className="text-xs text-gray-500 truncate">Email</p>
            </div>
          </div>

          {/* Logout button */}
          <button
            type="button"
            onClick={handleSignOut}
            title="Sign out"
            aria-label="Sign out"
            className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
