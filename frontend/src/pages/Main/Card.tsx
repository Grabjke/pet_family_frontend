import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Pets } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import type { Pet } from "../../modules/pets/petsSlice";
import { helpStatusMessages } from "../../utils/helpStatusMessages";

interface CardElementProps {
  cardData: Pet;
}
export function CardElement({ cardData }: CardElementProps) {
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
              {cardData.name}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" paragraph>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              Вакцинация:
            </Box>{" "}
            {cardData.isVaccinated ? <CheckCircleIcon /> : <CancelIcon />}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              Город:
            </Box>{" "}
            {cardData.city}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              Статус:
            </Box>{" "}
            {helpStatusMessages[cardData.helpStatus]}
          </Typography>

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
