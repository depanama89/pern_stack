import React, { useState } from "react";
import useStore from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MdCurrencyExchange, MdOutlineKeyboardArrowDown } from "react-icons/md";
import TransitionWrapper from "../../components/wrapper/transitionWrapper";
import { RiMenu3Fill } from "react-icons/ri";

const links = [
  { label: "Dashboard", link: "/overview" },
  { label: "Transactions", link: "/transactions" },
  { label: "Accounts", link: "/accounts" },
  { label: "Settings", link: "/settings" },
];
const Navbar = () => {
  const { user, setCredentails } = useStore((state) => state);
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
        <div className=" flex items-center gap-2 cursor-pointer ">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-violet-600">
            <MdCurrencyExchange className="text-3xl text-violet-200" />
          </div>
          <span className="hidden md:block text-lg font-bold md:text-2xl lg:text-3xl">
            DépenSys
          </span>
        </div>
        <div className="hidden lg:block ">
          <div className="flex  gap-6">
            {links.map((link) => (
              <Link
                to={link.link}
                className="hover:bg-gray-400 hover:text-gray-100 transition ease-out duration-100 px-3 py-2 rounded-3xl "
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex">
          <RiMenu3Fill className="cursor-pointer font-bold md:w-8 md:h-8 lg:w-10 lg:h-10 lg:hidden" />
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
