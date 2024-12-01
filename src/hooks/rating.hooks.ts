import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { createRating, getAverageRating } from "../services/RatingServices";

export const useGetAverageRating = (id: string) => {
  return useQuery<any, Error>({
    queryKey: ["RATINGS", id],
    queryFn: async () => await getAverageRating(id),
  });
};

export const useCreateRating = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (data) => await createRating(data),
    onSuccess: () => {
      toast.success("Rating created successfully.");
      queryClient.invalidateQueries({ queryKey: ["RATINGS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
