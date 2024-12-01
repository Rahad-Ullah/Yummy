import { FieldValues } from "react-hook-form";
import axios from "axios";

import axiosInstance from "@/src/lib/AxiosInstance";
import envConfig from "@/src/config/envConfig";

export const getRecipes = async (query: string) => {
  try {
    const { data } = await axiosInstance.get(`/recipes${query}`);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const getSingleRecipe = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/recipes/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const createRecipe = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      `/recipes/create-recipe`,
      payload
    );

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const updateRecipe = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/recipes/${payload.id}`,
      payload.data
    );

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const updateRecipeStatus = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/recipes/change-status/${payload.id}`,
      payload.data
    );

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};


export const deleteRecipe = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.delete(`/recipes/${payload.id}`);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const uploadToImgBB = async (file: File): Promise<string | null> => {
  const formData = new FormData();

  formData.append("image", file);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${envConfig.imgBB_Key}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    const url = response.data.data.url;
    const splitedUrl = url.split("i.ibb.co");
    const parsedUrl = `${splitedUrl[0]}i.ibb.co.com${splitedUrl[1]}`;

    // Return the URL of the uploaded image
    return parsedUrl;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error uploading to imgBB:", error);

    return null;
  }
};
