import ErrorCard from "@/components/auth/error-card";
import { FC } from "react";

interface AuthErrorPageProps {}

const AuthErrorPage: FC<AuthErrorPageProps> = ({}) => {
  return <ErrorCard />;
};

export default AuthErrorPage;
