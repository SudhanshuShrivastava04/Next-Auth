import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Should must be  at least 6 characters long",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Should must be  at least 6 characters long",
  }),
  name: z.string().min(1, {
    message: "Name should not be empty",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .refine((password) => {
        return (
          password.match(/[a-z]/) &&
          password.match(/[A-Z]/) &&
          password.match(/[0-9]/)
        );
      }, "Password must contain at least one uppercase letter, one lowercase letter, and one number."),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .refine((password) => {
        return (
          password.match(/[a-z]/) &&
          password.match(/[A-Z]/) &&
          password.match(/[0-9]/)
        );
      }, "Password must contain at least one uppercase letter, one lowercase letter, and one number."),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;

      return true;
    },
    {
      message: "New Password is Required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) return false;

      return true;
    },
    {
      message: "Password is Required!",
      path: ["password"],
    }
  );
