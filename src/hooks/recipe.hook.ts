/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { createRecipe, getRecipes } from "../services/RecipeService";

/* eslint-disable prettier/prettier */
export const useGetRecipes = (query: string) => {
  return useQuery<any, Error>({
    queryKey: ["RECIPES"],
    queryFn: async () => await getRecipes(query as unknown as string),
  });
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (data) => await createRecipe(data),
    onSuccess: () => {
      toast.success("Recipe created successfully.");
      queryClient.invalidateQueries({ queryKey: ["RECIPES"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// export const useUpdateAdmin = () => {
//   const queryClient = useQueryClient();

//   return useMutation<any, Error, FieldValues>({
//     mutationFn: async (data) => await updateAdmin(data),
//     onSuccess: () => {
//       toast.success("Admin updated successfully.");
//       queryClient.invalidateQueries({ queryKey: ["ADMINS"] });
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });
// };

// export const useRemoveAdmin = () => {
//   const queryClient = useQueryClient();

//   return useMutation<any, Error, FieldValues>({
//     mutationFn: async (data) => await removeAdmin(data),
//     onSuccess: () => {
//       toast.success("Admin removed successfully.");
//       queryClient.invalidateQueries({ queryKey: ["ADMINS"] });
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });
// };
