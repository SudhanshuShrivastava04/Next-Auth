import { FC } from "react";
import CardWrapper from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface ErrorCardProps {}

const ErrorCard: FC<ErrorCardProps> = ({}) => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonhref="/auth/login"
      backbuttonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive w-20 h-20" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
