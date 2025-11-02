import { useEffect, useState } from "react";
import API from "../../api/axiosConfig";
import "./MyBookings.css";
import Loader from "../../components/Loader/Loader";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.get("/bookings/my");
      setBookings(res.data.bookings);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401)
        setError("Please log in again to view your bookings.");
      else
        setError(
          err.response?.data?.message ||
            "Failed to load your bookings. Please try again."
        );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="my-bookings-page error-page">
        <div className="error-box">
          <h2 className="error-title">⚠️ Something went wrong</h2>
          <p>{error}</p>
        </div>
      </div>
    );

  return (
    <div className="my-bookings-page">
      <h2 className="page-title">🎟️ My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="bookings-empty">You haven’t booked any tickets yet.</p>
      ) : (
        <div className="bookings-grid">
          {bookings.map((b) => (
            <div key={b._id} className="card">
              <h3>{b.movie?.title}</h3>
              <p>
                <b>Seats:</b> {b.seats.join(", ")}
              </p>
              <p>
                <b>Total Price:</b> ₹{b.totalPrice}
              </p>
              <p>
                <b>Booked On:</b>{" "}
                {new Date(b.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
