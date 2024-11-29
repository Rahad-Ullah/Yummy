/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changeUserStatus,
  deleteUser,
  getUsers,
  updateProfile,
} from "../services/UserService";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

/* eslint-disable prettier/prettier */
export const useGetUsers = (query: string) => {
  return useQuery<any, Error>({
    queryKey: ["USERS"],
    queryFn: async () => await getUsers(query as unknown as string),
  });
};

export const useUserStatusChanged = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (data) => await changeUserStatus(data),
    onSuccess: () => {
      toast.success("User status changed successfully.");
      queryClient.invalidateQueries({ queryKey: ["USERS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (data) => await updateProfile(data),
    onSuccess: () => {
      toast.success("Profile updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["USERS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (data) => await deleteUser(data),
    onSuccess: () => {
      toast.success("User deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["USERS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
