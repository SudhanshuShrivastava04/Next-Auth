"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  //also use for someother server actions
  await signOut();
};
