"use client";

import { FC, useState, useTransition } from "react";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
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
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { newPassword } from "@/actions/new-password";

interface NewPasswordFormProps {}

const NewPasswordForm: FC<NewPasswordFormProps> = ({}) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")

  const [visible, setVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });

    console.log("Submitted : ", values);
  };

  return (
    <CardWrapper
      headerLabel={"Forgot Password?"}
      backbuttonLabel={"Back to login"}
      backButtonhref={"/auth/login"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
