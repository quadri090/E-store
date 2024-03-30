"use client";

import { useCallback, useState } from "react";
import UserAvatar from "../UserAvatar";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import Backdrop from "./Backdrop";
import { safeUser } from "@/types";

interface UserMenuProps {
  currentUser: safeUser;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative z-30">
        <div
          className="p-1 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-2xl cursor-pointer hover:shadow-md transition text-slate-700"
          onClick={toggleOptions}
        >
          <UserAvatar />
          {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
            {currentUser ? (
              <div>
                <Link href="/orders">
                  <MenuItem onClick={toggleOptions}>Your Orders</MenuItem>
                </Link>
                <Link href="/admin">
                  <MenuItem onClick={toggleOptions}>Admin DashBoard</MenuItem>
                </Link>
                <hr/>
                <Link href="/">
                  <MenuItem
                    onClick={() => {
                      toggleOptions();
                      signOut();
                    }}
                  >
                    Log Out
                  </MenuItem>
                </Link>
              </div>
            ) : (
              <div>
                <Link href="/login">
                  <MenuItem onClick={toggleOptions}>Log In</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOptions}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <Backdrop onClick={toggleOptions} /> : null}
    </>
  );
};

export default UserMenu;
