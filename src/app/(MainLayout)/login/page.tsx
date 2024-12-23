"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";

import Loading from "@/src/components/UI/Loading";
import YMForm from "@/src/components/form/YMForm";
import YMInput from "@/src/components/form/YMInput";
import { loginValidationSchema } from "@/src/schemas/login.schema";
import { useUser } from "@/src/context/user.provider";
import { loginUser } from "@/src/services/AuthService";

const LoginPage = () => {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { setIsLoading: setUserLoading } = useUser();

  // const { mutate: handleLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsPending(true);
    const res = await loginUser(data);

    if (res?.success) {
      toast.success(res?.message);
      setIsPending(false);
      setIsSuccess(true);
    }
    if (!res?.success) {
      toast.error(res?.message);
      setIsPending(false);
    }
    setUserLoading(true);
  };

  const RedirectAfterLogin = () => {
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect");

    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }

    return isPending && <Loading />;
  };

  return (
    <Suspense fallback={<Loading />}>
      <RedirectAfterLogin />
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
    </Suspense>
  );
};

export default LoginPage;
