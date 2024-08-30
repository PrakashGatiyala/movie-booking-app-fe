import { useState, useEffect, useMemo } from "react";
import moment from "moment";
import useRazorpay from "react-razorpay";
import "./user-dashboard.style.css";
import { useLoggedInUser } from "../../hooks/auth.hooks";
import { useGetAllMovies } from "../../hooks/movie.hooks";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { useGetShowsByMovieID } from "../../hooks/show.hooks";

import { apiInstance } from "../../api";

const UserDashboard = () => {
  const [Razorpay] = useRazorpay();

  const { data: user } = useLoggedInUser();
  const { data: movies, isLoading } = useGetAllMovies();
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [selectedShowId, setSelectedShowId] = useState("");
  const [selectedSeat, setSelectedSeat] = useState(null);
  const { data: shows } = useGetShowsByMovieID(selectedMovieId);
  const [isBookingError, setIsBookingError] = useState(false);

  const showObj = useMemo(() => {
    if (!shows || !selectedShowId) return null;
    return shows.find((show) => show._id === selectedShowId);
  }, [selectedShowId, shows]);

  useEffect(() => {
    setSelectedSeat(null);
    setIsBookingError(false);
  }, [selectedShowId]);

  console.log(selectedShowId);

  async function handleCreateBooking() {
    try {
      const { data } = await apiInstance.post("/booking/create", {
        showId: selectedShowId,
        seatNumber: selectedSeat,
      });
      const order = data.data.booking;
      console.log(order);

      const options = {
        key: "rzp_test_5WQCffasPoe0cl",
        amount: order.amount,
        currency: order.currency,
        name: "Movie Booking",
        order_id: order.id,
        // handler: function (response) {
        //   alert(response.razorpay_payment_id);
        //   alert(response.razorpay_order_id);
        //   alert(response.razorpay_signature);
        //   POST: /booking/verify { razorpay_payment_id, razorpay_signature, selectedShowId,  selectedSeat }
        //   Thanks for booking with us
        // },
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      const errorMessage = error?.response?.data?.error;
      setIsBookingError(errorMessage || "Something went wrong");
      console.log(error);
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="user-dashboard-container">
      <div>
        <h1> {user.firstname} </h1>
        <div className="movie-display-grid">
          {movies?.map((movie) => {
            return (
              <Card key={movie._id} sx={{ maxWidth: 345, marginTop: "10px" }}>
                <CardActionArea
                  onClick={() => {
                    setSelectedMovieId(movie._id);
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {movie.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {movie.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </div>
      </div>
      <div>
        {shows && (
          <div className="movie-display-grid">
            {shows?.map((show) => {
              return (
                <Card key={show._id} sx={{ maxWidth: 345, marginTop: "10px" }}>
                  <CardActionArea
                    onClick={() => {
                      setSelectedShowId(show._id);
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {moment(show.startTimestamp).format(
                          "MM/DD/YYYY [at] hh:mm A"
                        )}{" "}
                        to{" "}
                        {moment(show.endTimestamp).format(
                          "MM/DD/YYYY [at] hh:mm a"
                        )}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        INR {show.price}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {show.theatreHallId.theatreId.name}
                      </Typography>
                      <Typography variant="h5" sx={{ color: "text.secondary" }}>
                        At:{" "}
                        {[
                          show.theatreHallId.theatreId.plot,
                          show.theatreHallId.theatreId.street,
                          show.theatreHallId.theatreId.city,
                          show.theatreHallId.theatreId.state,
                          show.theatreHallId.theatreId.pinCode,
                        ].join(", ")}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {show.theatreHallId.number}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      <div>
        <div>
          {showObj && (
            <div className="seat-container">
              {new Array(showObj.theatreHallId.seatingCapacity)
                .fill(0)
                .map((_, index) => {
                  return (
                    <span
                      onClick={() => {
                        setSelectedSeat(index + 1);
                        setIsBookingError(false);
                      }}
                      className={`seat ${
                        index + 1 === selectedSeat ? "selectedSeat" : ""
                      }`}
                      key={index}
                    >
                      {index + 1}
                    </span>
                  );
                })}
            </div>
          )}
        </div>
        {selectedSeat && showObj && (
          <div>
            <div className="action-button-container">
              <Button onClick={handleCreateBooking} className="payButton">
                Pay {showObj.price}{" "}
              </Button>
              <Button
                variant="outlined"
                className="cancelButton"
                onClick={() => {
                  setSelectedSeat(null);
                  setIsBookingError(false);
                }}
              >
                Cancel
              </Button>
            </div>
            <div>
              {isBookingError && (
                <Typography color="error">{isBookingError}</Typography>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
