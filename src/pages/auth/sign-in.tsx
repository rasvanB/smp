/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import { useForm } from "react-hook-form";
import AuthLayout from "~/components/auth-layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler } from "react-hook-form/dist/types";
import { inputStyles } from "~/styles/input-styles";
import { ErrorMessage } from "@hookform/error-message";
import Error from "~/components/error";
import Button from "~/components/button";
import { useState } from "react";
import Link from "next/link";
import { z } from "zod";

export const signInSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .required();

type SignInSchema = z.infer<typeof signInSchema>;

const SignIn: NextPage = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onTouched",
    criteriaMode: "firstError",
  });

  const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
    // SIGN IN HERE
  };

  return (
    <AuthLayout>
      <h2 className="my-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <form className=" flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        {error && <Error message={error} />}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email")}
            className={inputStyles({ intent: "auth" })}
            autoComplete="email"
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <Error message={message} />}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password")}
            className={inputStyles({ intent: "auth" })}
            autoComplete="current-password"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <Error message={message} />}
          />
        </div>
        <Link
          href="/auth/reset-password"
          className="text-sm font-medium text-blue-700"
        >
          Forgot Password?
        </Link>
        <Button role="auth" text="Sign In" type="submit" disabled={!isValid} />
      </form>
      <div className="font-regular mt-3 text-gray-900">
        {"Don't have an account?"}
        <Link href="/auth/sign-up" className="ml-1 font-medium text-blue-700">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
};
export default SignIn;
