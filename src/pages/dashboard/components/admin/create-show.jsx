import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useGetAllMovies } from "../../../../hooks/movie.hooks";
import {
  useCreateShow,
  useGetShowsByMovieID,
  useGetShowsByTheatreHallID,
} from "../../../../hooks/show.hooks";
import { useEffect } from "react";
import { useGetAllTheaters } from "../../../../hooks/theatre.hooks";
import { useGetAllTheatreHalls } from "../../../../hooks/theatre-hall";

const CreateShow = () => {
  const [movieId, setMovieId] = useState("");
  const { data: shows } = useGetShowsByMovieID(movieId);

  return (
    <div className="create-theatre-container">
      <div style={{ width: "50%" }}>
        <CreateShowForm movieId={movieId} setMovieId={setMovieId} />
      </div>
      <div style={{ width: "50%", padding: "10px" }}>
        {shows &&
          shows.map((show) => (
            <div key={show._id}>
              <pre>{JSON.stringify(show, null, 2)}</pre>
            </div>
          ))}
      </div>
    </div>
  );
};

const isShowOverlapping = (showsByHallId, startTime, endTime) => {
  return showsByHallId.some((show) => {
    const showStartTime = new Date(show.startTimestamp);
    const showEndTime = new Date(show.endTimestamp);
    const newShowStartTime = new Date(startTime);
    const newShowEndTime = new Date(endTime);

    return (
      (newShowStartTime >= showStartTime && newShowStartTime <= showEndTime) ||
      (newShowEndTime >= showStartTime && newShowEndTime <= showEndTime) ||
      (newShowStartTime <= showStartTime && newShowEndTime >= showEndTime)
    );
  });
};

// eslint-disable-next-line react/prop-types
const CreateShowForm = ({ movieId, setMovieId }) => {
  const [theatreHallId, setTheatreHallId] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState("");
  const [errorCreateShow, setErrorCreateShow] = useState(null);
  const [theatreId, setTheatreId] = useState(null);

  const { data: movies } = useGetAllMovies();
  const { data: theatres } = useGetAllTheaters();
  const { data: theatreHalls } = useGetAllTheatreHalls(theatreId);
  const { mutateAsync: createShowAsync } = useCreateShow();
  const { data: showsByHallId } = useGetShowsByTheatreHallID(theatreHallId);

  useEffect(() => {
    console.log(movies);
    if (movies && movies.length > 0) {
      setMovieId(movies[0]._id);
    }
  }, [movies, setMovieId]);

  useEffect(() => {
    if (theatres && theatres.length > 0) {
      setTheatreId(theatres[0]._id);
    }
  }, [theatres]);

  // useEffect(() => {
  //   if (theatreHalls && theatreHalls.length > 0) {
  //     setTheatreHallId(theatreHalls[0]._id);
  //   }
  // }, [theatreHalls]);

  const handleMovieId = (e) => {
    setMovieId(e.target.value);
    setErrorCreateShow(null);
  };

  const handleTheatreId = (e) => {
    setTheatreId(e.target.value);
    setErrorCreateShow(null);
  };

  const handleTheatreHallId = (e) => {
    setTheatreHallId(e.target.value);
    setErrorCreateShow(null);
  };
  const handleStartTime = (e) => {
    setStartTime(e.target.value);
    setErrorCreateShow(null);
  };
  const handleEndTime = (e) => {
    setEndTime(e.target.value);
    setErrorCreateShow(null);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
    setErrorCreateShow(null);
  };

  const handleCreateShow = async (e) => {
    e.preventDefault();
    if (showsByHallId) {
      const isOverlapping = isShowOverlapping(
        showsByHallId,
        startTime,
        endTime
      );

      if (isOverlapping) {
        setErrorCreateShow("Show timings overlap with existing show");
        return;
      }
    }

    try {
      await createShowAsync({
        movieId,
        theatreHallId,
        startTimestamp: new Date(startTime).getTime(),
        endTimestamp: new Date(endTime).getTime(),
        price: Number(price),
      });
      setStartTime("");
      setEndTime("");
      setPrice("");
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.error;
      setErrorCreateShow(errorMessage || "Something went wrong");
    }
  };
  return (
    <div>
      <Box component="form" onSubmit={handleCreateShow}>
        <div className="form-row">
          <TextField
            select
            label="Select Movie"
            fullWidth
            required
            value={movieId || ""}
            onChange={handleMovieId}
            InputLabelProps={{ shrink: true }}
          >
            {movies &&
              movies.map((movie) => (
                <MenuItem key={movie._id} value={movie._id}>
                  {movie.title}
                </MenuItem>
              ))}
          </TextField>
        </div>
        <div className="form-row">
          <TextField
            select
            label="Select Theatre"
            fullWidth
            required
            value={theatreId || ""}
            onChange={handleTheatreId}
            InputLabelProps={{ shrink: true }}
          >
            {theatres &&
              theatres.map((theatre) => (
                <MenuItem key={theatre._id} value={theatre._id}>
                  {theatre.name}
                </MenuItem>
              ))}
          </TextField>
        </div>
        {theatreId && (
          <div className="form-row">
            <TextField
              select
              label="Select Theatre Hall"
              fullWidth
              required
              value={theatreHallId || ""}
              onChange={handleTheatreHallId}
              InputLabelProps={{ shrink: true }}
            >
              {theatreHalls &&
                theatreHalls.map((theatreHall) => (
                  <MenuItem key={theatreHall._id} value={theatreHall._id}>
                    {`Hall No. ${theatreHall.number}, Capacity: ${theatreHall.seatingCapacity}`}
                  </MenuItem>
                ))}
            </TextField>
          </div>
        )}
        <div className="form-row">
          <TextField
            value={startTime}
            onChange={handleStartTime}
            fullWidth
            label="Start Time"
            type="datetime-local"
            required
            InputLabelProps={{ shrink: true }}
          ></TextField>
        </div>
        <div className="form-row">
          <TextField
            value={endTime}
            onChange={handleEndTime}
            fullWidth
            label="End Time"
            type="datetime-local"
            required
            InputLabelProps={{ shrink: true }}
          ></TextField>
        </div>
        <div className="form-row">
          <TextField
            value={price}
            onChange={handlePrice}
            fullWidth
            label="Price"
            type="number"
            required
          ></TextField>
        </div>

        {errorCreateShow && (
          <div className="form-row">
            <Typography color="error">{errorCreateShow}</Typography>
          </div>
        )}
        <div className="form-row">
          <Button type="submit" variant="contained">
            Create Show
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default CreateShow;
