/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { getAdmins, removeAdmin, updateAdmin } from "../services/AdminServices";

/* eslint-disable prettier/prettier */
export const useGetAdmins = (query: string) => {
  return useQuery<any, Error>({
    queryKey: ["ADMINS"],
    queryFn: async () => await getAdmins(query as unknown as string),
  });
};

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (data) => await updateAdmin(data),
    onSuccess: () => {
      toast.success("Admin updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["ADMINS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useRemoveAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (data) => await removeAdmin(data),
    onSuccess: () => {
      toast.success("Admin removed successfully.");
      queryClient.invalidateQueries({ queryKey: ["ADMINS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
