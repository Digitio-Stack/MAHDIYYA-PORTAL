import {
  faAdd,
  faBars,
  faBell,
  faBookOpen,
  faClock,
  faClose,
  faHome,
  faMarker,
  faMessage,
  faPersonChalkboard,
  faPlus,
  faPowerOff,
  faRecycle,
  faSchool,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserAuthContext } from "./../context/user";

function Sidebar() {
  const { authData, logout } = useContext(UserAuthContext);
  const [openSidebar, setOpenSidebar] = useState(false);

  const navigations = [
    {
      name: "Dashboard",
      route: "/admin",
      icon: faHome,
    },

    {
      name: "New Teacher",
      route: "/create-teacher",
      icon: faPersonChalkboard,
    },

    {
      name: "Marks",
      route: "/marks",
      icon: faBookOpen,
    },
  ];
  const SuperAdmin = [
    {
      name: "Dashboard",
      route: "/admin",
      icon: faHome,
    },
    {
      name: "Add Study Center",
      route: "/create-branch",
      icon: faPlus,
    },
    {
      name: "Study Centers",
      route: "/all-branches",
      icon: faSchool,
    },
    {
      name: "Create Course",
      route: "/create-course",
      icon: faClock,
    },
    {
      name: "Create Notification",
      route: "/create-notification",
      icon: faBell,
    },
    {
      name: "Create Messages",
      route: "/create-messages",
      icon: faMessage,
    },
    {
      name: "Result Management",
      route: "/add-result",
      icon: faMarker,
    },
    {
      name: "Recycle Bin",
      route: "/trash",
      icon: faRecycle,
    },
  ];

  return (
    <>
      <div onClick={() => setOpenSidebar(!openSidebar)}>
        <span className="absolute z-40 text-white text-4xl top-1 right-1 cursor-pointer">
          <button
            className="bi bi-filter-left px-2  rounded-md"
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            {!openSidebar ? (
              <FontAwesomeIcon
                icon={faBars}
                color="black"
                className=" cursor-pointer ml-28 lg:hidden"
              ></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon
                icon={faClose}
                color="white"
                className="cursor-pointer ml-28 lg:hidden"
              ></FontAwesomeIcon>
            )}
          </button>
        </span>

        <div
          className={`fixed 
            lg:block ${
              !openSidebar && "hidden"
            } top-0 bottom-0 lg:left-0 p-2 lg:w-[250px] w-full overflow-y-auto text-center bg-gray-900`}
        >
          <div className="p-2.5 mt-1 mb-6 flex items-center">
            <Link to={"/"} className=" ml-3">
              <h1 className="font-bold text-3xl text-gray-400 border-b-2">
                DASHBOARD
              </h1>
            </Link>
            <div className="my-2 bg-gray-600 h-[1px]" />
          </div>

          {authData?.role === "admin" &&
            navigations.map((navigation, index) => (
              <>
                <NavLink
                  to={navigation.route}
                  key={index}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 bg-blue-600 cursor-pointer hover:bg-blue-600 text-white"
                      : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                  }
                >
                  <FontAwesomeIcon icon={navigation.icon} />
                  <span className="text-[15px] ml-4 text-gray-200 font-bold">
                    {navigation.name}
                  </span>
                </NavLink>
              </>
            ))}
          {authData?.role === "superAdmin" &&
            SuperAdmin.map((navigation, index) => (
              <>
                <NavLink
                  to={navigation.route}
                  key={index}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 bg-blue-600 cursor-pointer hover:bg-blue-600 text-white"
                      : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                  }
                >
                  <FontAwesomeIcon icon={navigation.icon} />
                  <span className="text-[15px] ml-4 text-gray-200 font-bold">
                    {navigation.name}
                  </span>
                </NavLink>
              </>
            ))}

          <div className="my-4 bg-gray-600 h-[1px]" />

          {authData ? (
            <div className="absolute bottom-2">
              <div className="p-2.5 mt-3 flex items-center rounded-md px-4  bg-teal-500 duration-300 text-white">
                {authData && (
                  <Link
                    to={"/profile"}
                    className="text-[15px] ml-4  px-3 text-white font-bold uppercase"
                  >
                    <FontAwesomeIcon icon={faUser} /> {authData.username}
                  </Link>
                )}
              </div>
              <div
                onClick={() => logout()}
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white"
              >
                <FontAwesomeIcon icon={faPowerOff} />
                <span className="text-[15px] ml-4 text-gray-200 font-bold">
                  Logout
                </span>
              </div>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-green-600 text-white"
            >
              <i className="bi bi-box-arrow-in-right" />
              <span className="text-[15px] ml-4 text-gray-200 font-bold">
                Login
              </span>
            </Link>
          )}
          {authData?.role === "admin" && (
            <NavLink
              to={"/my-messages"}
              className={({ isActive }) =>
                isActive
                  ? "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 bg-blue-600 cursor-pointer hover:bg-blue-600 text-white"
                  : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
              }
            >
              <FontAwesomeIcon icon={faMessage} />
              <span className="text-[15px] ml-4 text-gray-200 font-bold">
                My Messages
              </span>
              {/* <span className="text-white ml-2 bg-red-500 px-2 rounded-full">{unreadMessages}</span> */}
            </NavLink>
          )}
          <a
            href="/add-student"
            target={"_blank"}
            className={
              "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300  cursor-pointer hover:bg-blue-600 text-white"
            }
          >
            <FontAwesomeIcon icon={faAdd} />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              new admission
            </span>
          </a>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
