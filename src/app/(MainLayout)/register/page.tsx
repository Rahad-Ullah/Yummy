/* eslint-disable import/order */
"use client";

import YMForm from "@/src/components/form/YMForm";
import YMInput from "@/src/components/form/YMInput";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function RegisterPage() {
  const router = useRouter();
  const { setIsLoading: setUserLoading } = useUser();

  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
  } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      profilePhoto:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };

    handleUserRegistration(userData);
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
          <h3 className="mb-6 text-4xl font-bold">Sign Up</h3>
          <YMForm
            // defaultValues={{
            //   name: "",
            //   email: "",
            //   mobileNumber: "",
            //   password: "",
            // }}
            resolver={zodResolver(registerValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <YMInput label="Name" name="name" size="sm" />
            </div>
            <div className="py-3">
              <YMInput label="Email" name="email" size="sm" />
            </div>
            <div className="py-3">
              <YMInput label="Mobile Number" name="mobileNumber" size="sm" />
            </div>
            <div className="py-3">
              <YMInput
                label="Password"
                name="password"
                size="sm"
                type="password"
              />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 text-default"
              size="lg"
              type="submit"
            >
              Registration
            </Button>
          </YMForm>
          <div className="text-center">
            Already have an account ? <Link href={"/login"}>Login</Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
