// File: Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen, onLogout }) => {
  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      label: "Home",
      path: "/",
      icon: (
        <svg
          className="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9.75L12 4l9 5.75v9.5A2.75 2.75 0 0118.25 22h-12A2.75 2.75 0 013 19.25v-9.5z" />
          <path d="M9 22V12h6v10" />
        </svg>
      ),
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: (
        <svg
          className="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
          <path d="M9 12h6" />
          <path d="M9 16h6" />
          <path d="M9 8h6" />
        </svg>
      ),
    },
    {
      label: "Categories",
      path: "/categories",
      icon: (
        <svg
          className="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 7h18v10H3z" />
          <path d="M3 7l5 5h10" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <aside
        className={`
          sticky top-0 left-0 h-screen min-h-screen
          bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900
          border-r border-gray-600/30
          text-white shadow-2xl
          transition-all duration-500 ease-out z-20
          ${isOpen ? "w-72 items-start" : "w-20 items-center"}
          flex flex-col
          relative overflow-hidden
        `}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-xl -mr-16 -mt-16" />
        <div className="absolute bottom-20 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-500/10 to-cyan-600/10 rounded-full blur-lg -ml-12" />

        {/* Content wrapper with relative positioning */}
        <div className="relative z-10 w-full h-full flex flex-col p-6">
          {/* Toggle Button + Logo */}
          <div
            className={`flex items-center mb-12 transition-all duration-500 ${
              isOpen ? "justify-start" : "justify-center w-full"
            }`}
            style={{ gap: isOpen ? "0.7 5rem" : 0 }}
          >
            <div 
              className="relative group cursor-pointer"
              onClick={toggleSidebar}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 p-2.5 rounded-xl hover:from-blue-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>

            {/* FIXED: Logo dengan transisi yang halus */}
            <div
              className={`
                ml-3 overflow-hidden transition-all duration-500 ease-in-out
                ${isOpen ? "w-48 opacity-100" : "w-0 opacity-0"}
              `}
            >
              <Link
                to="/"
                className="group block whitespace-nowrap"
              >
                <div className="text-2xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 select-none transition-all duration-300 hover:from-blue-200 hover:via-purple-200 hover:to-pink-200">
                  <span className="block leading-tight">MyTask</span>
                  <span className="block leading-tight">Manager</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <nav className={`flex flex-col space-y-3 text-lg w-full mb-8`}>
            {menuItems.map(({ label, path, icon }) => (
              <Link
                key={label}
                to={path}
                className={`
                  w-full flex items-center group relative
                  rounded-2xl transition-all duration-500 ease-in-out
                  hover:scale-105 hover:shadow-lg
                  ${isOpen 
                    ? "px-4 py-3.5 justify-start hover:bg-white/10 hover:backdrop-blur-sm" 
                    : "justify-center py-2.5 hover:bg-white/15"
                  }
                `}
                onClick={() => setIsOpen(true)}
                title={!isOpen ? label : ""}
              >
                <div className="relative z-10 flex items-center w-full">
                  <span className="flex-shrink-0 w-6 h-6 text-blue-200 group-hover:text-white transition-colors duration-300 group-hover:drop-shadow-sm flex items-center justify-center">
                    {icon}
                  </span>
                  
                  {/* FIXED: Text dengan transisi yang halus */}
                  <div
                    className={`
                      ml-4 overflow-hidden transition-all duration-500 ease-in-out
                      ${isOpen ? "w-32 opacity-100" : "w-0 opacity-0"}
                    `}
                  >
                    <span className="select-none font-medium whitespace-nowrap text-slate-200 group-hover:text-blue-400 transition-colors duration-300">
                      {label}
                    </span>
                  </div>
                </div>

                {/* FIXED: Tooltip dengan transisi yang lebih halus */}
                <div 
                  className={`
                    absolute left-full top-1/2 transform -translate-y-1/2 ml-4 z-50
                    pointer-events-none transition-all duration-300 ease-in-out
                    ${isOpen ? "opacity-0 scale-95" : "opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95"}
                  `}
                >
                  <div className="bg-gray-900 text-white px-3 py-2 text-sm rounded-lg shadow-xl border border-gray-700 whitespace-nowrap">
                    {label}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-1 w-2 h-2 bg-gray-900 rotate-45 border-l border-b border-gray-700" />
                  </div>
                </div>
              </Link>
            ))}
          </nav>

          {/* FIXED: Logout button dengan transisi yang halus */}
          <button
            onClick={onLogout}
            className={`
              mt-auto w-full flex items-center group relative
              rounded-2xl transition-all duration-500 ease-in-out
              hover:scale-105 hover:shadow-lg
              ${isOpen 
                ? "px-4 py-3.5 justify-start hover:bg-red-500/20 hover:backdrop-blur-sm" 
                : "justify-center py-3 hover:bg-red-500/25"
              }
            `}
            title={!isOpen ? "Logout" : ""}
          >
            <div className="relative z-10 flex items-center w-full">
              <span className="flex-shrink-0 w-6 h-6 text-red-300 transition-colors duration-300 group-hover:drop-shadow-sm flex items-center justify-center">
                <svg
                  className="w-6 h-6 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
                  <path d="M3 21V3a2 2 0 012-2h6" />
                </svg>
              </span>
              
              {/* FIXED: Logout text dengan transisi yang halus */}
              <div
                className={`
                  ml-4 overflow-hidden transition-all duration-500 ease-in-out
                  ${isOpen ? "w-20 opacity-100" : "w-0 opacity-0"}
                `}
              >
                <span className="select-none font-medium whitespace-nowrap text-red-300 group-hover:text-red-200 transition-colors duration-300">
                  Logout
                </span>
              </div>
            </div>
          </button>
          
        </div>
      </aside>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10 md:hidden transition-all duration-300"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;