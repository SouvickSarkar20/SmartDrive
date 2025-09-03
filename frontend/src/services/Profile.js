export const getProfile = async () => {
  const res = await API.get("/auth/profile");
  return res.data; // { _id, email, createdAt, ... }
};