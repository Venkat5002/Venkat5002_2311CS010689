import { Card, CardContent, Typography, Chip } from "@mui/material";

function NotificationCard({ notification }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>

        <Typography variant="h6">
          {notification.Message}
        </Typography>

        <Chip
          label={notification.Type}
          color="primary"
          sx={{ my: 1 }}
        />

        <Typography color="text.secondary">
          {notification.Timestamp}
        </Typography>

      </CardContent>
    </Card>
  );
}

export default NotificationCard;