"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";

import axiosInstance from "@/src/lib/AxiosInstance";

// Login service
export const loginUser = async (userData: FieldValues) => {

  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    // const errorMessage =
    //   error?.response?.data?.message || "An unexpected error occurred.";

    return error?.response?.data;

    // throw new Error(error?.response?.data?.message);
  }
};

// Register service
export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);

    if (data.success) {
      cookies().set("accessToken", data.accessToken);
      cookies().set("refreshToken", data.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const logout = async () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  redirect("/login");
};

// get current user from session
export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      role: decodedToken.role,
      email: decodedToken.email,
      mobileNumber: decodedToken.mobileNumber,
      profilePhoto: decodedToken.profilePhoto,
      bio: decodedToken.bio,
      membership: decodedToken.membership,
      status: decodedToken.status,
    };
  }

  return decodedToken;
};
