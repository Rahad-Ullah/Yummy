"use client";

/* eslint-disable import/order */
import YMForm from "@/src/components/form/YMForm";
import YMInput from "@/src/components/form/YMInput";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useUpdateUser } from "@/src/hooks/user.hook";
import updateUserSchema from "@/src/schemas/updateUser.schema";
import { uploadToImgBB } from "@/src/services/UserService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const ProfilePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const { user, setIsLoading: setUserLoading } = useUser();

  const { mutate: updateUser, isPending } = useUpdateUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // Upload the file to ImgBB and get the URL
      const profilePhotoUrl = file ? await uploadToImgBB(file) : null;

      // Prepare user data with the uploaded image URL
      const userData = {
        ...data,
        profilePhoto: profilePhotoUrl || user?.profilePhoto,
      };

      updateUser(
        { id: user?._id, data: userData },
        {
          onSuccess: () => {
            setUserLoading(true);
          },
        }
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="my-5">
      {isPending && <Loading />}
      <Card className="p-5">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* left side content */}
          <div className="">
            <img
              alt="profile-img"
              className="rounded-full p-2 w-60 mx-auto shadow-2xl dark:shadow-default-300"
              src={
                (user?.profilePhoto as string) ||
                "https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"
              }
            />
          </div>
          {/* right side content */}
          <CardBody>
            <YMForm
              defaultValues={{ ...user }}
              resolver={zodResolver(updateUserSchema)}
              onSubmit={onSubmit}
            >
              <div className="grid gap-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-12 border-">
                  <div>
                    <h1>Profile</h1>
                    <p>Update your photo and personal details</p>
                  </div>
                  <Button color="warning" type="submit" variant="shadow">
                    Save
                  </Button>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-1">
                  <p>Name</p>
                  <div className="w-full md:w-8/12">
                    <YMInput label="Name" name="name" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-1">
                  <p>Email</p>
                  <div className="w-full md:w-8/12">
                    <YMInput label="Email" name="email" type="email" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-1">
                  <p>Mobile Number</p>
                  <div className="w-full md:w-8/12">
                    <YMInput label="Mobile" name="mobileNumber" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-1">
                  <p>Profile Photo</p>
                  <div className="w-full md:w-8/12">
                    <Input
                      accept="image/*"
                      type="file"
                      variant="bordered"
                      onChange={(event) => {
                        const file = event.target.files?.[0];

                        if (file) {
                          setFile(file);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-1">
                  <p>Bio</p>
                  <div className="w-full md:w-8/12">
                    <YMInput label="Bio" name="bio" />
                  </div>
                </div>
              </div>
            </YMForm>
          </CardBody>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
