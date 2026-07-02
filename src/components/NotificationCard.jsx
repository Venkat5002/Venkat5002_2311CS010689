import { Card, CardContent, Typography, Chip, Box } from "@mui/material";

function NotificationCard({ notification = {} }) {
  const message = notification.Message ?? notification.message ?? "No message";
  const type = notification.Type ?? notification.type ?? "General";
  const timestamp = notification.Timestamp ?? notification.timestamp ?? "Unknown time";

  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 10px 30px rgba(79, 70, 229, 0.12)", border: "1px solid #c7d2fe", background: "linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
          <Typography variant="h6" sx={{ color: "#312e81", fontWeight: 700 }}>
            {message}
          </Typography>
          <Chip label={type} size="small" sx={{ fontWeight: 700, backgroundColor: "#4f46e5", color: "white" }} />
        </Box>

        <Typography color="text.secondary" sx={{ mt: 1.5 }}>
          {timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;