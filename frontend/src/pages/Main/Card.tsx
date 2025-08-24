import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";
import { Pets } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export function CardElement() {
  return (
    <section>
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
          },
        }}
      >
        <CardMedia
          sx={{ height: 200 }}
          image="/public/1e7b92b6bc9796f0a7d78b9e386b870d.jpg"
          title="Барсик"
        />

        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Pets sx={{ mr: 1, color: "primary.main" }} />
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              Барсик, 1 год 7 месяцев
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" paragraph>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              Вакцинация:
            </Box>{" "}
            <CheckCircleIcon />
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              Отношение к людям:
            </Box>{" "}
            Хорошее
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              Отношение к другим животным:
            </Box>{" "}
            Хорошее
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
            <Chip
              label="#трехцветка"
              size="small"
              variant="outlined"
              sx={{ fontSize: "0.7rem" }}
            />

            <Chip
              label="#домашняя_передержка"
              size="small"
              variant="outlined"
              sx={{ fontSize: "0.7rem" }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              sx={{
                flex: 1,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Подробнее
            </Button>

            <Button
              variant="outlined"
              size="small"
              sx={{
                minWidth: "auto",
                borderRadius: 2,
                padding: "6px 8px",
              }}
            >
              <StarIcon />
            </Button>
          </Box>
        </CardContent>
      </Card>
    </section>
  );
}
