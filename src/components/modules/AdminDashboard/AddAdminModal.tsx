/* eslint-disable import/order */
"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import YMForm from "../../form/YMForm";
import YMInput from "../../form/YMInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { uploadToImgBB } from "@/src/services/UserService";
import { useAddAdmin } from "@/src/hooks/admin.hook";
import addUserSchema from "@/src/schemas/addUser.schema";

export default function AddAdminModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const { mutate: addAdmin } = useAddAdmin();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // throw an error if the file is not selected
      if (!file) {
        setFileError("Profile photo is required");

        return;
      }

      // Upload the file to ImgBB and get the URL
      const profilePhotoUrl = file ? await uploadToImgBB(file) : null;

      // Prepare user data with the uploaded image URL
      const userData = {
        ...data,
        profilePhoto: profilePhotoUrl || null,
      };

      addAdmin({ data: userData });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {/* modal trigger */}
      <Button color="warning" onPress={onOpen}>
        Add Admin
      </Button>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        scrollBehavior="outside"
        onClose={() => {
          setFile(null);
          setFileError("");
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1">
                Add Admin
              </ModalHeader>
              <YMForm resolver={zodResolver(addUserSchema)} onSubmit={onSubmit}>
                <ModalBody className="gap-5">
                  <div>
                    <YMInput label="Name" name="name" size="sm" />
                  </div>
                  <div>
                    <YMInput label="Email" name="email" size="sm" />
                  </div>
                  <div>
                    <YMInput label="Password" name="password" size="sm" />
                  </div>
                  <div>
                    <YMInput
                      label="Mobile Number"
                      name="mobileNumber"
                      size="sm"
                    />
                  </div>
                  <div>
                    <Input
                      accept="image/*"
                      className={`${fileError && "border-red-500 text-red-500"}`}
                      defaultValue={file?.name}
                      label="Profile Photo"
                      type="file"
                      variant="bordered"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const file = event.target.files?.[0];

                        if (file) {
                          setFile(file);
                          setFileError("");
                        }
                      }}
                    />
                    <p className="text-xs text-danger-500 ml-2 mt-1">
                      {fileError}
                    </p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="warning" type="submit">
                    Add
                  </Button>
                </ModalFooter>
              </YMForm>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
