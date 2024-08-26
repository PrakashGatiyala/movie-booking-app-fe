import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "../api";

export const useCreateTheatreHall = () => {
  const queryClient = useQueryClient();
  const theatreHall = useMutation({
    mutationFn: async ({ theatreId, number, seatingCapacity }) => {
      const { data } = await apiInstance.post(
        `/admin/theatres/${theatreId}/halls`,
        {
          number,
          seatingCapacity,
        }
      );
      return data.data.theatreHall;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["theatreHalls"] });
    },
  });
  return theatreHall;
};

export const useGetAllTheatreHalls = (theatreId) => {
  const theatreHalls = useQuery({
    queryKey: ["theatreHalls", theatreId],
    enabled: !!theatreId,
    queryFn: async () => {
      //   if (!theatreId) return [];
      const { data } = await apiInstance.get(
        `/admin/theatres/${theatreId}/halls`
      );
      return data.data.theatreHalls;
    },
  });
  return theatreHalls;
};
