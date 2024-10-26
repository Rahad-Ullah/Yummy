/* eslint-disable import/order */
import axiosInstance from "@/src/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const getAdmins = async (query: string) => {
  try {
    const data = await axiosInstance.get(`/admins${query}`);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const addAdmin = async (payload: FieldValues) => {
  try {
    const data = await axiosInstance.post(`/admins/create-admin`, payload.data);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const updateAdmin = async (payload: FieldValues) => {
  try {
    const data = await axiosInstance.patch(
      `/admins/${payload.id}`,
      payload.data
    );

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const removeAdmin = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.delete(`/admins/${payload.id}`);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
