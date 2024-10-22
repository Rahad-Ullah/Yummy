"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import Loading from "@/src/components/UI/Loading";
import YMForm from "@/src/components/form/YMForm";
import YMInput from "@/src/components/form/YMInput";
import { loginValidationSchema } from "@/src/schemas/login.schema";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { useUser } from "@/src/context/user.provider";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectRoute = searchParams.get("redirect");
  const { setIsLoading: setUserLoading } = useUser();

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    setUserLoading(true);
  };

  if (!isPending && isSuccess) {
    if (redirectRoute) {
      router.push(redirectRoute);
    } else {
      router.push("/");
    }
  }

  return (
    <>
      {isPending && <Loading />}
      <div className="flex w-full min-h-screen flex-col items-center justify-center bg-[url('https://townsquare.media/site/701/files/2023/04/attachment-Untitled-design-31.jpg')] bg-cover bg-center px-4">
        <div className="w-full max-w-md p-6 md:p-8 lg:p-10 rounded-md border backdrop-blur-md bg-black/10 text-center">
          <h3 className="mb-6 text-4xl font-bold">Login</h3>
          <YMForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <YMInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3">
              <YMInput label="Password" name="password" type="password" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </YMForm>
          <div className="text-center">
            Don&lsquo;t have account ? <Link href={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
