import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Pets } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import type { Pet } from "../../modules/pets/petsSlice";
import { helpStatusMessages } from "../../utils/helpStatusMessages";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../shared/hooks/useFavorites";
import { toast } from "react-toastify";
import { PetPhoto } from "../../shared/components/PetPhoto";
import { PhotoLightbox } from "../../shared/components/PhotoLightbox";
import { useState } from "react";

interface CardElementProps {
  cardData: Pet;
}

export function CardElement({ cardData }: CardElementProps) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleCardClick = () => {
    navigate(`/pets/${cardData.id}`);
  };

  const handlePhotoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cardData.photos && cardData.photos.length > 0) {
      setLightboxOpen(true);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isAdded = toggleFavorite({
      id: cardData.id,
      type: "pet",
      name: cardData.name,
      imageUrl: "/public/1e7b92b6bc9796f0a7d78b9e386b870d.jpg",
    });

    if (isAdded) {
      toast.success("Добавлено в избранное");
    } else {
      toast.info("Удалено из избранного");
    }
  };

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
        <Box
          onClick={handlePhotoClick}
          sx={{ cursor: "pointer" }}
        >
          <PetPhoto
            photos={cardData.photos}
            alt={cardData.name}
            sx={{ height: 200, width: "100%", objectFit: "cover" }}
          />
        </Box>

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

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              Вакцинация:
            </Box>{" "}
            {cardData.isVaccinated ? <CheckCircleIcon /> : <CancelIcon />}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              Город:
            </Box>{" "}
            {cardData.city}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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

            <Tooltip title={isFavorite(cardData.id) ? "Удалить из избранного" : "Добавить в избранное"}>
              <IconButton
                size="small"
                sx={{
                  minWidth: "auto",
                  borderRadius: 2,
                  padding: "6px 8px",
                  color: isFavorite(cardData.id) ? "warning" : "default",
                }}
                onClick={handleFavoriteClick}
              >
                {isFavorite(cardData.id) ? <StarIcon /> : <StarBorderIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>

      <PhotoLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        photos={cardData.photos || []}
        petName={cardData.name}
      />
    </section>
  );
}
