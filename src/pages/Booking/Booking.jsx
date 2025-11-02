import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../api/axiosConfig";
import "./Booking.css";
import Loader from "../../components/Loader/Loader";

export default function Booking() {
  const { id, showtimeId } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await API.get(`/movies/${id}`);
        setMovie(res.data.movie);
      } catch (err) {
        console.error(err);
        if (err.response?.data?.message) setError(err.response.data.message);
        else setError("Failed to load movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleSeatClick = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleBooking = async () => {
    try {
      setBookingLoading(true);
      setError(null);
      await API.post("/bookings", {
        movieId: id,
        showtimeId,
        seats: selectedSeats,
        totalPrice: selectedSeats.length * 200,
      });
      navigate("/my-bookings");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Booking failed. Try again.";
      setError(msg);
    } finally {
      setBookingLoading(false);
    }
  };

  // 🌀 Loading state
  if (loading) return <Loader />;

  // ⚠️ Error or invalid movie
  if (error)
    return (
      <div className="booking-page error-page">
        <h2>Booking Unavailable ⚠️</h2>
        <p className="error-text">{error}</p>
      </div>
    );

  if (!movie) return <p className="loading">Movie not found.</p>;

  const showtime = movie?.showtimes?.find((s) => s._id === showtimeId);
  if (!showtime)
    return (
      <div className="booking-page error-page">
        <h2>Invalid Showtime</h2>
        <p className="error-text">The selected showtime was not found.</p>
      </div>
    );

  const bookedSeats = showtime.bookedSeats || [];
  const groupedSeats = showtime.seats.reduce((acc, seat) => {
    const row = seat.charAt(0).toUpperCase();
    if (!acc[row]) acc[row] = [];
    acc[row].push(seat);
    return acc;
  }, {});

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h2>{movie.title}</h2>
        <p className="showtime">
          <b>Showtime:</b> {new Date(showtime.time).toLocaleString()}
        </p>
      </div>

      <div className="theater">
        <div className="screen">SCREEN</div>

        {/* 🎞️ Seats grouped by row */}
        <div className="seats-container">
          {Object.keys(groupedSeats).map((row) => (
            <div key={row} className="seat-row">
              <span className="row-label">{row}</span>
              <div className="seats-grid">
                {groupedSeats[row].map((seat) => {
                  const isBooked = bookedSeats.includes(seat);
                  const isSelected = selectedSeats.includes(seat);
                  return (
                    <button
                      key={seat}
                      onClick={() => handleSeatClick(seat)}
                      disabled={isBooked}
                      className={`seat 
                        ${isBooked ? "booked" : ""} 
                        ${isSelected ? "selected" : ""}`}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 🧭 Legend */}
        <div className="seat-legend">
          <div>
            <span className="legend available"></span> Available
          </div>
          <div>
            <span className="legend selected"></span> Selected
          </div>
          <div>
            <span className="legend booked"></span> Booked
          </div>
        </div>
      </div>

      <div className="booking-summary">
        <p>
          <b>Seats:</b> {selectedSeats.join(", ") || "None"}
        </p>
        <p>
          <b>Total:</b> ₹{selectedSeats.length * 200}
        </p>
        {error && <p className="error-text">{error}</p>}
        <button
          className="confirm-btn"
          onClick={handleBooking}
          disabled={selectedSeats.length === 0 || bookingLoading}
        >
          {bookingLoading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
