import React, { useState } from "react";
import useStore from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MdCurrencyExchange, MdOutlineKeyboardArrowDown } from "react-icons/md";
import TransitionWrapper from "../../components/wrapper/transitionWrapper";
import { RiMenu3Fill } from "react-icons/ri";
import { Avatar } from "../../assets/index";
import ThemeSwitch from "../ThemeSwitch";
const links = [
  { label: "Dashboard", link: "/overview" },
  { label: "Transactions", link: "/transactions" },
  { label: "Accounts", link: "/accounts" },
  { label: "Settings", link: "/settings" },
];
const Navbar = () => {
  const { user, setCredentails } = useStore((state) => state);
  console.log(user);
  
  const [selected, setSelected] = useState(0);

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setCredentails(null);
    navigate("/signin");
  };
  return (
    <div className="w-full flex items-center py-6 ">
      <div className="w-full flex justify-between items-center">
        {/* <div className=" flex items-center gap-2 cursor-pointer "> */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
           
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-violet-600">
              <MdCurrencyExchange className="text-3xl text-violet-200" />
            </div>
            <span className=" dark:text-white text-black  md:block text-lg font-bold md:text-2xl lg:text-3xl">
              DépenSys
            </span>
          </Link>
        {/* </div> */}
        <div className="hidden lg:block ">
          <div className="flex items-center gap-4">
            {links.map((link, index) => (
              <div
                key={index}
                className={`${
                  index === selected
                    ? " bg-black text-white dark:bg-slate-800 px-6 py-2  rounded-3xl "
                    : "text-gray-900 dark:text-gray-500 px-6 py-2 "
                }`}
                onClick={() => setSelected(index)}
              >
                <Link
                  to={link.link}
                  className="  transition ease-out duration-100   "
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <ThemeSwitch/>
          {/* <RiMenu3Fill className="cursor-pointer font-bold md:w-8 md:h-8 lg:w-10 lg:h-10 lg:hidden" /> */}
          <div className="flex items-center gap-2 ">
            <img
              src={Avatar}
              alt="user"
              className="w-10 md:w-12 h-10 md:h-12 object-cover rounded-full"
            />
            <div className="hidden md:block">
              <p className="text-lg font-medium text-black dark:text-gray-400">
                {user?.firstname}
              </p>
              <span className="text-sm text-gray-700 dark:text-gray-500">
                {user?.email}
              </span>
            </div>
            <MdOutlineKeyboardArrowDown onClick={handleSignOut} className="hidden md:block text-2xl text-gray-600 dark:text-gray-300 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
