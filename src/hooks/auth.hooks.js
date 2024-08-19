import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "../api";

export const useSignUp = () => {
  const queryClient = useQueryClient();

  const signUp = useMutation({
    mutationFn: async ({ firstname, lastname, email, password }) => {
      const { data } = await apiInstance.post("/auth/sign-up", {
        firstname,
        lastname,
        email,
        password,
      });
      const token = data.data.token;
      console.log(data);
      if (token) {
        localStorage.setItem("token", token);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  return signUp;
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  const signIn = useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await apiInstance.post("/auth/sign-in", {
        email,
        password,
      });
      const token = data.data.token;
      console.log(data);
      if (token) {
        localStorage.setItem("token", token);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  return signIn;
};

export const useLoggedInUser = () => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await apiInstance.get("/auth/me");
      if (!data.isLoggedIn) return null;

      return data.data.user;
    },
  });
  return query;
};
