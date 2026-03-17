import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

export interface UserProfile {
  userName: string;
  userEmail: string;
  userTel?: string;
}

export function getGetMeQueryKey() {
  return ["me"];
}

export function useGetMe(options?: { query?: { retry?: number } }) {
  return useQuery<UserProfile>({
    queryKey: getGetMeQueryKey(),
    queryFn: async () => {
      const token = api.getToken();
      if (!token) throw new Error("No token");
      return api.getMe();
    },
    retry: options?.query?.retry ?? 1,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      api.clearToken();
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}