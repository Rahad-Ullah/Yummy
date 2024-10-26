/* eslint-disable import/order */
"use client";

import { IUser } from "@/src/types";
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
import { PencilLine } from "lucide-react";
import YMForm from "../../form/YMForm";
import YMInput from "../../form/YMInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { uploadToImgBB } from "@/src/services/UserService";
import { useAddAdmin, useUpdateAdmin } from "@/src/hooks/admin.hook";
import addUserSchema from "@/src/schemas/addUser.schema";

export default function AddAdminModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);

  const { mutate: addAdmin } = useAddAdmin();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // Upload the file to ImgBB and get the URL
      const profilePhotoUrl = file ? await uploadToImgBB(file) : null;

      // Prepare user data with the uploaded image URL
      const userData = {
        ...data,
        profilePhoto: profilePhotoUrl || null,
      };
      console.log(userData);
      addAdmin({ data: userData });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {/* modal trigger */}
      <Button onPress={onOpen} color="warning">
        Add Admin
      </Button>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
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
                      label="Profile Photo"
                      labelPlacement="outside-left"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];

                        if (file) {
                          setFile(file);
                        }
                      }}
                    />
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
