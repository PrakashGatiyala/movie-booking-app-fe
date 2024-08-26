import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "../api";

export const useCreateShow = () => {
  const queryClient = useQueryClient();
  const show = useMutation({
    mutationFn: async ({
      movieId,
      theatreHallId,
      startTimestamp,
      endTimestamp,
      price,
    }) => {
      const { data } = await apiInstance.post("/admin/shows", {
        movieId,
        theatreHallId,
        startTimestamp,
        endTimestamp,
        price,
      });
      return data.data.show;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["showsByMovie"] });
      await queryClient.invalidateQueries({ queryKey: ["showsByTheatreHall"] });
    },
  });
  return show;
};

export const useGetShowsByMovieID = (movieId) => {
  const shows = useQuery({
    queryKey: ["showsByMovie", movieId],
    enabled: !!movieId,
    queryFn: async () => {
      const { data } = await apiInstance.get(`/admin/shows/movie/${movieId}`);
      return data.data.shows;
    },
  });
  return shows;
};

export const useGetShowsByTheatreHallID = (theatreHallId) => {
  const shows = useQuery({
    queryKey: ["showsByTheatreHall", theatreHallId],
    enabled: !!theatreHallId,
    queryFn: async () => {
      const { data } = await apiInstance.get(
        `/admin/shows/theatre-hall/${theatreHallId}`
      );
      return data.data.shows;
    },
  });
  return shows;
};
