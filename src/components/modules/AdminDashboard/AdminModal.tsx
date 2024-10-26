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
import updateUserSchema from "@/src/schemas/updateUser.schema";
import { useState } from "react";
import { uploadToImgBB } from "@/src/services/UserService";
import { useUpdateAdmin } from "@/src/hooks/admin.hook";

export default function AdminModal({ user }: { user: IUser }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);

  const { mutate: updateAdmin } = useUpdateAdmin();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // Upload the file to ImgBB and get the URL
      const profilePhotoUrl = file ? await uploadToImgBB(file) : null;

      // Prepare user data with the uploaded image URL
      const userData = {
        ...data,
        profilePhoto: profilePhotoUrl || user.profilePhoto,
      };

      updateAdmin({ data: userData, id: user._id });
  

      // Proceed with your API call or submission logic
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {/* modal trigger */}
      <PencilLine onClick={onOpen} />

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1">
                Update Profile
              </ModalHeader>
              <YMForm
                defaultValues={{ ...user, bio: "" }}
                resolver={zodResolver(updateUserSchema)}
                onSubmit={onSubmit}
              >
                <ModalBody>
                  <div className="py-3">
                    <YMInput label="Name" name="name" size="sm" />
                  </div>
                  <div className="py-3">
                    <YMInput label="Email" name="email" size="sm" />
                  </div>
                  <div className="py-3">
                    <YMInput
                      label="Mobile Number"
                      name="mobileNumber"
                      size="sm"
                    />
                  </div>
                  <div className="py-3">
                    <YMInput label="Bio" name="bio" size="sm" type="text" />
                  </div>
                  <div className="py-3">
                    <Input
                      label="Profile Photo"
                      labelPlacement="outside-left"
                      type="file"
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
                    Update
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
