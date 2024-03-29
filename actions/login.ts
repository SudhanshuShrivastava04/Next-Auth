"use server";

import { LoginSchema } from "@/schemas";
import { z } from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid field!" };
  }

  const { email, password } = validateFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invaild Credentials!" };

        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }

  console.log(values); // action for server side console log (check terminal)
};
