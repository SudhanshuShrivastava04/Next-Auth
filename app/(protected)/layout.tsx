import React, { FC } from "react";
import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: FC<ProtectedLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen py-4 w-full flex flex-col gap-y-4 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
