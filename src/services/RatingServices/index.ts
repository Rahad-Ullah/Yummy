import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/AxiosInstance";


export const getAverageRating = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/ratings/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const createRating = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      `/ratings/create-rating`,
      payload
    );

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
