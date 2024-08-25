import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import {
  useCreateTheatre,
  useGetAllTheaters,
} from "../../../../hooks/theatre.hooks";
import "./create-theatre.style.css";

const CreateTheatre = () => {
  const { data: theatres } = useGetAllTheaters();
  return (
    <div className="create-theatre-container">
      <div style={{ width: "50%" }}>
        <CreateTheatreForm />
      </div>
      <div style={{ width: "50%", padding: "10px" }}>
        {theatres &&
          theatres.map((theatre) => (
            <div key={theatre._id}>
              <pre>{JSON.stringify(theatre, null, 2)}</pre>
            </div>
          ))}
      </div>
    </div>
  );
};

const CreateTheatreForm = () => {
  const [name, setName] = useState("");
  const [plot, setPlot] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [errorCreateTheatre, setErrorCreateTheatre] = useState(null);

  const { mutateAsync: createTheatreAsync } = useCreateTheatre();

  const handleName = (e) => {
    setName(e.target.value);
    setErrorCreateTheatre(null);
    setErrorCreateTheatre(null);
  };
  const handlePlot = (e) => {
    setPlot(e.target.value);
    setErrorCreateTheatre(null);
  };
  const handleStreet = (e) => {
    setStreet(e.target.value);
    setErrorCreateTheatre(null);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
    setErrorCreateTheatre(null);
  };
  const handleState = (e) => {
    setState(e.target.value);
    setErrorCreateTheatre(null);
  };
  const handleCountry = (e) => {
    setCountry(e.target.value);
    setErrorCreateTheatre(null);
  };
  const handlePinCode = (e) => {
    setPinCode(e.target.value);
    setErrorCreateTheatre(null);
  };

  const handleCreateTheatre = async (e) => {
    e.preventDefault();
    console.log("Creating Theatre");
    try {
      await createTheatreAsync({
        name,
        plot,
        street,
        city,
        state,
        country,
        pinCode: Number(pinCode),
      });
      setName("");
      setPlot("");
      setStreet("");
      setCity("");
      setState("");
      setCountry("");
      setPinCode("");
    } catch (error) {
      const errorMessage = error?.response?.data?.error;
      setErrorCreateTheatre(
        typeof errorMessage === "string" ? errorMessage : "Something went wrong"
      );
      console.error(error);
    }
  };

  return (
    <div>
      <Box component="form" onSubmit={handleCreateTheatre}>
        <div className="form-row">
          <TextField
            value={name}
            onChange={handleName}
            fullWidth
            label="Theatre Name"
            required
          ></TextField>
        </div>
        <div className="form-row">
          <TextField
            value={plot}
            onChange={handlePlot}
            fullWidth
            label="Plot"
            required
          ></TextField>
        </div>
        <div className="form-row">
          <TextField
            value={street}
            onChange={handleStreet}
            fullWidth
            label="Street"
            required
          ></TextField>
        </div>
        <div className="form-row">
          <TextField
            value={city}
            onChange={handleCity}
            fullWidth
            label="City"
            required
          ></TextField>
        </div>
        <div className="form-row">
          <TextField
            value={state}
            onChange={handleState}
            fullWidth
            label="State"
            required
          ></TextField>
        </div>
        <div className="form-row">
          <TextField
            value={country}
            onChange={handleCountry}
            fullWidth
            label="Country"
            required
          ></TextField>
        </div>
        <div className="form-row">
          <TextField
            value={pinCode}
            type="number"
            onChange={handlePinCode}
            fullWidth
            label="Pin Code"
            required
          ></TextField>
        </div>
        {errorCreateTheatre && (
          <div className="form-row">
            <Typography color="error">{errorCreateTheatre}</Typography>
          </div>
        )}
        <div className="form-row">
          <Button type="submit" variant="contained">
            Create Theatre
          </Button>
        </div>
      </Box>
    </div>
  );
};
export default CreateTheatre;
