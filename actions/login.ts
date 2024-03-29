"use server";

import { LoginSchema } from "@/schemas";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid field!" };
  }

  return { success: "Email sent!" };
  console.log(values); // action for server side console log (check terminal)
};
