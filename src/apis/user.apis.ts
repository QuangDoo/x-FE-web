export const getUser = async () => {
  try {
    const result = await fetch(`/users/get-all-users`);

    return result.json();
  } catch (error) {
    console.log("error :>> ", error);
  }
};
