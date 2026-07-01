import { useEffect, useState } from "react";
import api from "../services/api";

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    console.log("Fetching notifications...");

    try {
      const response = await api.get("/notifications");

      console.log("API Response:", response.data);

      setNotifications(response.data.notifications);
    } catch (error) {
      console.log("Error:", error);
      console.log("Response:", error.response);
      console.log("Request:", error.request);
      console.log("Message:", error.message);

      setError("Failed to fetch notifications");
    }
  };

  console.log("Notifications:", notifications);

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Notifications</h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {notifications.length === 0 && !error && (
        <p>Loading notifications...</p>
      )}

      {notifications.map((notification) => (
        <div
          key={notification.ID}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h3>{notification.Message}</h3>

          <p>
            <strong>Type:</strong> {notification.Type}
          </p>

          <p>
            <strong>Time:</strong> {notification.Timestamp}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AllNotifications;