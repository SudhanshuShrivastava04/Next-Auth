"use client";

import { FC, useState } from "react";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/register";

interface RegisterFormProps {}

const RegisterForm: FC<RegisterFormProps> = ({}) => {
  const [visible, setVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values) // server side console log (check terminal)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
    });

    console.log("Submitted : ", values); // client side console log
  };

  return (
    <CardWrapper
      headerLabel={"Create an account"}
      backbuttonLabel={"Already have an account?"}
      backButtonhref={"/auth/login"}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="John Doe"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      placeholder="john.doe@example.com"
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
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
