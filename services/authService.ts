import api from "@/lib/axios";

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

