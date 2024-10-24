/* eslint-disable import/order */
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/UserService";

/* eslint-disable prettier/prettier */
export const useGetUsers = (query: string) => {
  return useQuery<any, Error>({
    queryKey: ["USERS"],
    queryFn: async () => await getUsers(query as unknown as string),
  });
};
