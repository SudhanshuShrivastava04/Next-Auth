"use client";

import React, { FC } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Header from "./header";
import Social from "./social";
import BackButton from "./back-button";


interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backbuttonLabel: string;
  backButtonhref: string;
  showSocial?: boolean;
}

const CardWrapper: FC<CardWrapperProps> = ({
  showSocial,
  children,
  backButtonhref,
  backbuttonLabel,
  headerLabel,
}) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header lable={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonhref} label={backbuttonLabel} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
