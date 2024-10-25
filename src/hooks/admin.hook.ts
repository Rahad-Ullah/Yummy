/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changeUserStatus, deleteUser } from "../services/UserService";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { getAdmins } from "../services/AdminServices";

/* eslint-disable prettier/prettier */
export const useGetAdmins = (query: string) => {
  return useQuery<any, Error>({
    queryKey: ["ADMINS"],
    queryFn: async () => await getAdmins(query as unknown as string),
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
