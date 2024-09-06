import http from "@/lib/http";

export const getUser = async () => {
  try {
    const result = await http(`/users/get-all-users`);

    return result;
  } catch (error) {
    console.log("error :>> ", error);
  }
};
