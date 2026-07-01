import { useEffect, useState } from "react";
import api from "../services/api";
import { prioritySort } from "../utils/priority";
import NotificationCard from "../components/NotificationCard";
  

function AllNotifications() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/notifications");

      setNotifications(response.data.notifications);

    } catch (error) {
      setError("Failed to fetch notifications");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const topNotifications = prioritySort(notifications).slice(0, 10);

  return (
    <div>
      <h1>Priority Inbox</h1>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading &&
        topNotifications.map((notification) => (
          <NotificationCard
    key={notification.ID}
    notification={notification}
/>
        ))}
    </div>
  );
}

export default AllNotifications;