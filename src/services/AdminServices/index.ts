import axiosInstance from "@/src/lib/AxiosInstance";

export const getAdmins = async (query: string) => {
  try {
    const data = await axiosInstance.get(`/admins${query}`);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

// export const changeUserStatus = async (payload: FieldValues) => {
//   try {
//     const { data } = await axiosInstance.patch(
//       `/users/change-status/${payload.id}`,
//       { status: payload.status },
//     );

//     return data;
//   } catch (error: any) {
//     throw new Error(error?.response?.data?.message);
//   }
// };

// export const deleteUser = async (payload: FieldValues) => {
//   try {
//     const { data } = await axiosInstance.delete(`/users/${payload.id}`);

//     return data;
//   } catch (error: any) {
//     throw new Error(error?.response?.data?.message);
//   }
// };