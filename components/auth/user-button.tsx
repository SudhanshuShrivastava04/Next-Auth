"use client";

import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import LoginButton from "./login-button";
import { ExitIcon } from "@radix-ui/react-icons";

interface UserButtonProps {}

const UserButton: FC<UserButtonProps> = ({}) => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full focus:outline-none">
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LoginButton>
          <DropdownMenuItem>
            <ExitIcon className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LoginButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
