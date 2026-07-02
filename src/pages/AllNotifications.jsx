import { useEffect, useState } from "react";
import api from "../services/api";
import NotificationCard from "../components/NotificationCard";

const fallbackNotifications = [
  {
    ID: 1,
    Message: "Your placement result is out.",
    Type: "Result",
    Timestamp: "2026-07-02T10:00:00Z",
  },
  {
    ID: 2,
    Message: "A new campus event is scheduled.",
    Type: "Event",
    Timestamp: "2026-07-01T09:30:00Z",
  },
  {
    ID: 3,
    Message: "Your internship placement has been confirmed.",
    Type: "Placement",
    Timestamp: "2026-06-30T17:15:00Z",
  },
];

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchNotifications = async () => {
      try {
        const response = await api.get("/notifications");
        const payload = response?.data?.notifications ?? response?.data ?? [];

        if (isMounted) {
          setNotifications(Array.isArray(payload) ? payload : []);
        }
      } catch (err) {
        if (isMounted) {
          setNotifications(fallbackNotifications);
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNotifications();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div style={{ padding: "24px", background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "8px", color: "#312e81" }}>All Notifications</h1>
        <p style={{ marginTop: 0, marginBottom: "20px", color: "#475569" }}>
          Stay updated with the latest alerts and updates.
        </p>

        {loading && <p style={{ color: "#475569" }}>Loading notifications...</p>}

        {!loading && notifications.length === 0 && (
          <p style={{ color: "#475569" }}>No notifications found.</p>
        )}

        <div style={{ display: "grid", gap: "12px" }}>
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.ID ?? notification.id ?? notification.Message}
              notification={notification}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllNotifications;