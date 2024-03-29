import { FC } from "react";
import CardWrapper from "./card-wrapper";

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
  return (
    <CardWrapper
      headerLabel={"Welcome Back"}
      backbuttonLabel={"Don't have an account?"}
      backButtonhref={"/auth/register"}
      showSocial
    >
      login-form
    </CardWrapper>
  );
};

export default LoginForm;
