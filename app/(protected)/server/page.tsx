import UserInfo from "@/components/user-info";
import { currentUser } from "@/lib/auth";
import { FC } from "react";

interface ServerPageProps {}

const ServerPage: FC<ServerPageProps> = async ({}) => {
  const user = await currentUser();
  return <UserInfo label="Server component" user={user} />;
};

export default ServerPage;
