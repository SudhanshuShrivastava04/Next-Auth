"use client";

import UserInfo from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FC } from "react";

interface ClientPageProps {}

const ClientPage: FC<ClientPageProps> = ({}) => {
  const user = useCurrentUser();
  return <UserInfo label="Client Side Rendering" user={user} />;
};

export default ClientPage;
