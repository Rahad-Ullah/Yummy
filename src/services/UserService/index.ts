import axiosInstance from "@/src/lib/AxiosInstance";

export const getUsers = async (query: string) => {
  try {
    const { data } = await axiosInstance.get(`/users${query}`);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const changeUserStatus = async (query: string) => {
  try {
    const { data } = await axiosInstance.get(`/users${query}`);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
