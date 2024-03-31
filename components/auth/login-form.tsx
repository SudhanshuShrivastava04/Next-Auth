"use client";

import { FC, useEffect, useRef, useState, useTransition } from "react";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { login } from "@/actions/login";
import Link from "next/link";

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is already in use with different provider"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [otpTimer, setOtpTimer] = useState(60); // Timer in seconds
  const otpTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (showTwoFactor) {
      otpTimerRef.current = window.setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);

      return () => {
        if (otpTimerRef.current !== null) {
          clearInterval(otpTimerRef.current);
        }
      };
    }
  }, [showTwoFactor]);

  useEffect(() => {
    if (otpTimer === 0) {
      clearInterval(otpTimerRef.current!);
      setShowTwoFactor(false);
      setOtpTimer(60); // Reset timer to initial value
    }
  }, [otpTimer]);

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
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });

    console.log("Submitted : ", values); // client side console log
  };

  return (
    <CardWrapper
      headerLabel={showTwoFactor ? "Two-Factor Authentication" : "Welcome Back"}
      backbuttonLabel={
        showTwoFactor
          ? `OTP expires in ${otpTimer} seconds`
          : "Don't have an account?"
      }
      backButtonhref={"/auth/register"}
      showSocial={showTwoFactor ? false : true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-center">
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isPending}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator className="text-gray-400 font-semibold" />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
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
                            {visible ? (
                              <AiOutlineEye />
                            ) : (
                              <AiOutlineEyeInvisible />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button className="w-full" type="submit" disabled={isPending}>
            {showTwoFactor ? "Confirm OTP" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
