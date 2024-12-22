/* eslint-disable import/order */
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { loginUser, registerUser } from "../services/AuthService";

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => {
      try {
        // Call the login service
        const response = await loginUser(userData);

        return response;
      } catch (error: any) {
        // Ensure the thrown error contains the correct message
        console.log(error);
        if (error.response?.data) {
          throw new Error(error.response.data.message); // Throw server error
        }
        throw new Error("An unexpected error occurred");
      }
    },
    onSuccess: () => {
      toast.success("User login successful.");
    },
    onError: (error) => {
      console.error("React Query Error:", error); // Log full error
      toast.error(error.message || "Something went wrong");
    },
  });
};

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
