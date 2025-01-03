/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import {
  createRecipe,
  deleteRecipe,
  getRecipes,
  getSingleRecipe,
  updateRecipe,
  updateRecipeStatus,
} from "../services/RecipeService";

/* eslint-disable prettier/prettier */
export const useGetRecipes = (query: string) => {
  return useQuery<any, Error>({
    queryKey: ["RECIPES"],
    queryFn: async () => await getRecipes(query as unknown as string),
  });
};

export const useGetSingleRecipe = (id: string) => {
  return useQuery<any, Error>({
    queryKey: ["RECIPES"],
    queryFn: async () => await getSingleRecipe(id),
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

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (data) => await updateRecipe(data),
    onSuccess: () => {
      toast.success("Recipe updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["RECIPES"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateRecipeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (data) => await updateRecipeStatus(data),
    onSuccess: () => {
      toast.success("Recipe status updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["RECIPES"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (data) => await deleteRecipe(data),
    onSuccess: () => {
      toast.success("Recipe deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["RECIPES"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
