"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FC } from "react";

interface SettingsPageProps {}

const SettingsPage: FC<SettingsPageProps> = ({}) => {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <Button onClick={onClick} type="submit">
        Sign Out
      </Button>
    </div>
  );
};

export default SettingsPage;
