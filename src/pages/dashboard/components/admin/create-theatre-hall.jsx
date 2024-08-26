import { useState } from "react";
import { useGetAllTheaters } from "../../../../hooks/theatre.hooks";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import {
  useCreateTheatreHall,
  useGetAllTheatreHalls,
} from "../../../../hooks/theatre-hall";

const CreateTheatreHall = () => {
  const [theatreId, setTheatreId] = useState(null);
  const { data: theatreHalls } = useGetAllTheatreHalls(theatreId);

  return (
    <div className="create-theatre-container">
      <div style={{ width: "50%" }}>
        <CreateTheatreHallForm
          theatreId={theatreId}
          setTheatreId={setTheatreId}
        />
      </div>
      <div style={{ width: "50%", padding: "10px" }}>
        {theatreHalls &&
          theatreHalls.map((theatreHall) => (
            <div key={theatreHall._id}>
              <pre>{JSON.stringify(theatreHall, null, 2)}</pre>
            </div>
          ))}
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const CreateTheatreHallForm = ({ theatreId, setTheatreId }) => {
  const [number, setNumber] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [errorTheatreHall, setErrorTheatreHall] = useState(null);

  const { data: theatres } = useGetAllTheaters();
  const { mutateAsync: createTheatreHallAsync } = useCreateTheatreHall();

  const handleNumber = (e) => {
    setNumber(e.target.value);
    setErrorTheatreHall(null);
  };
  const handleCapacity = (e) => {
    setSeatingCapacity(e.target.value);
    setErrorTheatreHall(null);
  };

  const handleTheatreId = (e) => {
    setTheatreId(e.target.value);
    setErrorTheatreHall(null);
  };
  useEffect(() => {
    if (theatres && theatres.length > 0) {
      setTheatreId(theatres[0]._id);
    }
  }, [theatres, setTheatreId]);

  const handleCreateTheatreHall = async (e) => {
    e.preventDefault();
    if (!theatreId) {
      alert("Please select a theatre");
      return;
    }
    try {
      await createTheatreHallAsync({
        theatreId,
        number: Number(number),
        seatingCapacity: Number(seatingCapacity),
      });
      setNumber("");
      setSeatingCapacity("");
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.error;
      setErrorTheatreHall(errorMessage || "Something went wrong");
    }
  };

  return (
    <div>
      <Box component="form" onSubmit={handleCreateTheatreHall}>
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
        <div className="form-row">
          <TextField
            value={number}
            onChange={handleNumber}
            fullWidth
            label="Theatre Hall Number"
            type="number"
            required
          ></TextField>
        </div>
        <div className="form-row">
          <TextField
            value={seatingCapacity}
            onChange={handleCapacity}
            fullWidth
            label="Seating Capacity"
            type="number"
            required
          ></TextField>
        </div>

        {errorTheatreHall && (
          <div className="form-row">
            <Typography color="error">{errorTheatreHall}</Typography>
          </div>
        )}
        <div className="form-row">
          <Button disabled={!theatreId} type="submit" variant="contained">
            Create Theatre Hall
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default CreateTheatreHall;
