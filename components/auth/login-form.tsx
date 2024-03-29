"use client";

import { FC, useState } from "react";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { login } from "@/actions/login";

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
  const [visible, setVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values) // server side console log (check terminal)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
    });

    console.log("Submitted : ", values); // client side console log
  };

  return (
    <CardWrapper
      headerLabel={"Welcome Back"}
      backbuttonLabel={"Don't have an account?"}
      backButtonhref={"/auth/register"}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@emaxple.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="w-full flex space-x-2">
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type={visible ? "text" : "password"}
                      />

                      <Button
                        variant="outline"
                        disabled={isPending}
                        type="button"
                        onClick={() => setVisible((prev) => !prev)}
                      >
                        {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" type="submit" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
