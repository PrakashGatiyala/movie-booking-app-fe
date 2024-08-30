import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "../api";

export const useCreateTheatre = () => {
  const queryClient = useQueryClient();
  const theatre = useMutation({
    mutationFn: async ({
      name,
      plot,
      street,
      city,
      state,
      country,
      pinCode,
    }) => {
      const { data } = await apiInstance.post("/admin/theatres", {
        name,
        plot,
        street,
        city,
        state,
        country,
        pinCode,
      });
      return data.data.theatre;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["theatres"] });
    },
  });
  return theatre;
};

export const useGetAllTheaters = () => {
  const theaters = useQuery({
    queryKey: ["theatres"],
    queryFn: async () => {
      const { data } = await apiInstance.get("/api/theatres");
      return data.data.theatres;
    },
  });
  return theaters;
};
