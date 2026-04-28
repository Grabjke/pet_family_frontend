import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Person, Email, Phone } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import type { Volunteer } from "../../modules/volunteers/volunteersSlice";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../shared/hooks/useFavorites";
import { toast } from "react-toastify";

interface VolunteerCardProps {
  volunteerData: Volunteer;
}

export function VolunteerCard({ volunteerData }: VolunteerCardProps) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleCardClick = () => {
    navigate(`/volunteers/${volunteerData.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isAdded = toggleFavorite({
      id: volunteerData.id,
      type: "volunteer",
      name: [volunteerData.name, volunteerData.surName, volunteerData.patronymic]
        .filter(Boolean)
        .join(" "),
      imageUrl: "/public/Manya-690x460-406558120.jpg",
    });

    if (isAdded) {
      toast.success("Добавлено в избранное");
    } else {
      toast.info("Удалено из избранного");
    }
  };

  const fullName = [
    volunteerData.name,
    volunteerData.surName,
    volunteerData.patronymic,
  ]
    .filter(Boolean)
    .join(" ");

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
          cursor: "pointer",
        }}
        onClick={handleCardClick}
      >
        <CardMedia
          sx={{ height: 200 }}
          image="/public/Manya-690x460-406558120.jpg"
          title={fullName}
        />

        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Person sx={{ mr: 1, color: "primary.main" }} />
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {fullName}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              Опыт:
            </Box>{" "}
            {volunteerData.experience} лет
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              Email:
            </Box>{" "}
            {volunteerData.email}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              Телефон:
            </Box>{" "}
            {volunteerData.phoneNumber}
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

            <Tooltip title={isFavorite(volunteerData.id) ? "Удалить из избранного" : "Добавить в избранное"}>
              <IconButton
                size="small"
                sx={{
                  minWidth: "auto",
                  borderRadius: 2,
                  padding: "6px 8px",
                  color: isFavorite(volunteerData.id) ? "warning" : "default",
                }}
                onClick={handleFavoriteClick}
              >
                {isFavorite(volunteerData.id) ? <StarIcon /> : <StarBorderIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    </section>
  );
}