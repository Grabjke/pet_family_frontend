import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Grid,
  IconButton,
  Tooltip,
  Paper,
  Avatar,
} from "@mui/material";
import { Pets, Person, Delete, Star, StarBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../shared/hooks/useFavorites";
import { renderErrorState } from "../../utils/errorPageWithState";

export function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, isLoaded, removeFromFavorites, isFavorite } =
    useFavorites();

  const handleRemove = (id: string) => {
    removeFromFavorites(id);
  };

  const handleCardClick = (item: { id: string; type: string }) => {
    if (item.type === "pet") {
      navigate(`/pets/${item.id}`);
    } else if (item.type === "volunteer") {
      navigate(`/volunteers/${item.id}`);
    }
  };

  if (!isLoaded) {
    return (
      <Box className="flex items-center justify-center h-full">
        <Typography variant="body1">Загрузка...</Typography>
      </Box>
    );
  }

  const pets = favorites.filter((f) => f.type === "pet");
  const volunteers = favorites.filter((f) => f.type === "volunteer");

  if (favorites.length === 0) {
    return (
      <Box className="flex flex-col items-center justify-center h-full p-6">
        <StarBorder sx={{ fontSize: 64, color: "text.secondary", mb: 4 }} />
        <Typography variant="h5" className="text-gray-500 mb-2">
          Избранное пусто
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="text-center max-w-md"
        >
          Добавляйте животных и волонтеров в избранное, чтобы они всегда были
          под рукой
        </Typography>
      </Box>
    );
  }

  return (
    <div className="flex flex-col h-full w-full p-4 gap-4">
      <div
        className="flex-1 border border-gray-300 rounded-lg overflow-hidden"
        style={{ height: "80vh" }}
      >
        <div className="h-full overflow-y-auto p-4 bg-white">
          <Box className="mb-6">
            <Typography variant="h4" component="h1" className="font-bold mb-2">
              Избранное
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {favorites.length}{" "}
              {favorites.length === 1 ? "элемент" : "элементов"}
            </Typography>
          </Box>

          {pets.length > 0 && (
            <>
              <Typography variant="h5" className="font-bold mb-4">
                Животные
              </Typography>
              <Grid container spacing={3} className="mb-6">
                {pets.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card
                      sx={{
                        borderRadius: 2,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "all 0.3s",
                        "&:hover": {
                          boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                          transform: "translateY(-4px)",
                        },
                        cursor: "pointer",
                      }}
                      onClick={() => handleCardClick(item)}
                    >
                      <CardMedia
                        sx={{ height: 200 }}
                        image={item.imageUrl}
                        alt={item.name}
                      />
                      <CardContent sx={{ p: 3 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <Pets sx={{ mr: 1, color: "primary.main" }} />
                          <Typography variant="h6" className="font-bold">
                            {item.name}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            Добавлено:{" "}
                            {new Date(item.addedAt).toLocaleDateString("ru-RU")}
                          </Typography>
                          <Tooltip title="Удалить из избранного">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemove(item.id);
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {volunteers.length > 0 && (
            <>
              <Typography variant="h5" className="font-bold mb-4">
                Волонтеры
              </Typography>
              <Grid container spacing={3}>
                {volunteers.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card
                      sx={{
                        borderRadius: 2,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "all 0.3s",
                        "&:hover": {
                          boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                          transform: "translateY(-4px)",
                        },
                        cursor: "pointer",
                      }}
                      onClick={() => handleCardClick(item)}
                    >
                      <CardMedia
                        sx={{ height: 200 }}
                        image={item.imageUrl}
                        alt={item.name}
                      />
                      <CardContent sx={{ p: 3 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <Person sx={{ mr: 1, color: "primary.main" }} />
                          <Typography variant="h6" className="font-bold">
                            {item.name}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            Добавлено:{" "}
                            {new Date(item.addedAt).toLocaleDateString("ru-RU")}
                          </Typography>
                          <Tooltip title="Удалить из избранного">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemove(item.id);
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
