import { useParams, useNavigate } from "react-router-dom";
import { useGetPetByIdQuery } from "../../modules/pets/api";
import { useGetVolunteerByIdQuery } from "../../modules/volunteers/api";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Paper,
  Avatar,
  Grid,
  IconButton,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material";
import {
  Pets,
  LocationOn,
  Phone,
  CalendarToday,
  Scale,
  Height,
  CheckCircle,
  Cancel,
  Star,
  Favorite,
  MedicalServices,
  Restaurant,
  Home,
  Send,
  StarBorder,
  Person,
  ArrowForward,
} from "@mui/icons-material";
import { helpStatusMessages } from "../../utils/helpStatusMessages";
import { renderErrorState } from "../../utils/errorPageWithState";
import { useFavorites } from "../../shared/hooks/useFavorites";
import { toast } from "react-toastify";
import { PetPhoto } from "../../shared/components/PetPhoto";

export function PetDetailPage() {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const {
    data: petData,
    isLoading,
    isError,
  } = useGetPetByIdQuery(petId!, {
    skip: !petId,
  });

  const pet = petData?.result;

  const {
    data: volunteerData,
  } = useGetVolunteerByIdQuery(pet?.volunteerId || "", {
    skip: !pet?.volunteerId,
  });

  const volunteer = volunteerData?.result;

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center h-full">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (isError || !pet) {
    return renderErrorState({
      name: "Животное не найдено",
      description: "Не удалось загрузить информацию о животном",
    });
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleVolunteerClick = () => {
    if (volunteer) {
      navigate(`/volunteers/${volunteer.id}`);
    }
  };

  const handleFavoriteClick = () => {
    const isAdded = toggleFavorite({
      id: pet.id,
      type: "pet",
      name: pet.name,
      imageUrl: "/public/1e7b92b6bc9796f0a7d78b9e386b870d.jpg",
    });

    if (isAdded) {
      toast.success("Добавлено в избранное");
    } else {
      toast.info("Удалено из избранного");
    }
  };

  const getHelpStatusColor = (status: string) => {
    switch (status) {
      case "1":
        return "error";
      case "2":
        return "warning";
      case "3":
        return "success";
      default:
        return "default";
    }
  };

  const getHelpStatusIcon = (status: string) => {
    switch (status) {
      case "1":
        return <MedicalServices />;
      case "2":
        return <Home />;
      case "3":
        return <Favorite />;
      default:
        return <Pets />;
    }
  };

  return (
    <Box className="p-6 max-w-7xl mx-auto">
      <Button
        onClick={handleBack}
        variant="text"
        sx={{ mb: 4, color: "text.secondary" }}
        startIcon={<span>←</span>}
      >
        Назад к списку
      </Button>

      <Box className="mb-6">
        <Box className="flex items-center gap-4 mb-2">
          <Avatar
            sx={{ width: 80, height: 80, bgcolor: "primary.main" }}
            src="/public/1e7b92b6bc9796f0a7d78b9e386b870d.jpg"
          >
            <Pets sx={{ fontSize: 40 }} />
          </Avatar>
          <Box>
            <Typography variant="h3" component="h1" className="font-bold">
              {pet.name}
            </Typography>
            <Box className="flex items-center gap-2 mt-1">
              <Chip
                label={helpStatusMessages[pet.helpStatus]}
                color={getHelpStatusColor(pet.helpStatus)}
                size="small"
                icon={getHelpStatusIcon(pet.helpStatus)}
              />
              <Chip
                label={pet.speciesId}
                color="info"
                size="small"
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {pet.photos && pet.photos.length > 0 && (
            <Paper elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
              <Box className="p-6">
                <Typography variant="h5" className="font-bold mb-4">
                  Фотографии
                </Typography>
                <Box className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {pet.photos.map((photo, index) => (
                    <Box
                      key={index}
                      sx={{
                        aspectRatio: "1",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <PetPhoto
                        photos={[photo]}
                        alt={`${pet.name} ${index + 1}`}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Paper>
          )}

          <Paper elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
            <Box className="p-6">
              <Typography variant="h5" className="font-bold mb-4">
                Описание
              </Typography>
              <Typography variant="body1" color="text.secondary" className="leading-relaxed">
                {pet.description || "Описание отсутствует"}
              </Typography>
            </Box>
          </Paper>

          <Paper elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
            <Box className="p-6">
              <Typography variant="h5" className="font-bold mb-4">
                Характеристики
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <Box className="p-4 bg-blue-50 rounded-xl text-center">
                    <Scale sx={{ fontSize: 32, color: "#1976D2", mb: 1 }} />
                    <Typography variant="caption" color="text.secondary">
                      Вес
                    </Typography>
                    <Typography variant="h6" className="font-bold">
                      {pet.weight} кг
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box className="p-4 bg-green-50 rounded-xl text-center">
                    <Height sx={{ fontSize: 32, color: "#388E3C", mb: 1 }} />
                    <Typography variant="caption" color="text.secondary">
                      Рост
                    </Typography>
                    <Typography variant="h6" className="font-bold">
                      {pet.height} см
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box className="p-4 bg-purple-50 rounded-xl text-center">
                    <CalendarToday sx={{ fontSize: 32, color: "#7B1FA2", mb: 1 }} />
                    <Typography variant="caption" color="text.secondary">
                      Возраст
                    </Typography>
                    <Typography variant="h6" className="font-bold">
                      {new Date(pet.birthday).toLocaleDateString("ru-RU")}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box className="p-4 bg-orange-50 rounded-xl text-center">
                    <Restaurant sx={{ fontSize: 32, color: "#F57C00", mb: 1 }} />
                    <Typography variant="caption" color="text.secondary">
                      Окрас
                    </Typography>
                    <Typography variant="h6" className="font-bold">
                      {pet.colour || "Не указан"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          <Paper elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
            <Box className="p-6">
              <Typography variant="h5" className="font-bold mb-4">
                Здоровье
              </Typography>
              <Typography variant="body1" color="text.secondary" className="leading-relaxed">
                {pet.healthInformation || "Информация о здоровье отсутствует"}
              </Typography>
            </Box>
          </Paper>

          {volunteer && (
            <Paper elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
              <Box className="p-6">
                <Typography variant="h5" className="font-bold mb-4">
                  Волонтер
                </Typography>
                <Card
                  sx={{
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    },
                  }}
                  onClick={handleVolunteerClick}
                >
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Avatar
                      sx={{ width: 60, height: 60, bgcolor: "primary.main" }}
                      src="/public/Manya-690x460-406558120.jpg"
                    >
                      <Person sx={{ fontSize: 30 }} />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" className="font-bold">
                        {[volunteer.name, volunteer.surName, volunteer.patronymic]
                          .filter(Boolean)
                          .join(" ")}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {volunteer.experience} лет опыта
                      </Typography>
                    </Box>
                    <ArrowForward sx={{ color: "text.secondary" }} />
                  </CardContent>
                </Card>
              </Box>
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
            <Box className="p-6">
              <Typography variant="h5" className="font-bold mb-4">
                Статус
              </Typography>
              <Box className="flex flex-col gap-3">
                <Box className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <Box className="flex items-center gap-2">
                    {pet.isVaccinated ? (
                      <CheckCircle sx={{ color: "#388E3C" }} />
                    ) : (
                      <Cancel sx={{ color: "#D32F2F" }} />
                    )}
                    <Typography variant="body2">Вакцинирован</Typography>
                  </Box>
                </Box>

                <Box className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <Box className="flex items-center gap-2">
                    {pet.castration ? (
                      <CheckCircle sx={{ color: "#1976D2" }} />
                    ) : (
                      <Cancel sx={{ color: "#D32F2F" }} />
                    )}
                    <Typography variant="body2">
                      Кастрирован/Стерилизован
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>

          <Paper elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
            <Box className="p-6">
              <Typography variant="h5" className="font-bold mb-4">
                Местоположение
              </Typography>
              <Box className="flex flex-col gap-3">
                <Box className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                  <Box className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <LocationOn sx={{ color: "#F57C00" }} />
                  </Box>
                  <Box className="flex-1">
                    <Typography variant="caption" color="text.secondary">
                      Город
                    </Typography>
                    <Typography variant="body2" className="font-medium">
                      {pet.city || "Не указан"}
                    </Typography>
                  </Box>
                </Box>

                {pet.street && (
                  <Box className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Box className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Home sx={{ color: "#616161" }} />
                    </Box>
                    <Box className="flex-1">
                      <Typography variant="caption" color="text.secondary">
                        Адрес
                      </Typography>
                      <Typography variant="body2" className="font-medium">
                        {pet.street}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>

          <Paper elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
            <Box className="p-6">
              <Typography variant="h5" className="font-bold mb-4">
                Контакты
              </Typography>
              <Box className="flex flex-col gap-3">
                <Box className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <Box className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Phone sx={{ color: "#1976D2" }} />
                  </Box>
                  <Box className="flex-1">
                    <Typography variant="caption" color="text.secondary">
                      Телефон
                    </Typography>
                    <Typography variant="body2" className="font-medium">
                      {pet.ownersPhoneNumber || "Не указан"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>

          <Paper elevation={2} sx={{ borderRadius: 3 }}>
            <Box className="p-6">
              <Typography variant="h5" className="font-bold mb-4">
                Действия
              </Typography>
              <Box className="flex flex-col gap-2">
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<Send />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Связаться
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  startIcon={isFavorite(pet.id) ? <Star /> : <StarBorder />}
                  onClick={handleFavoriteClick}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    color: isFavorite(pet.id) ? "warning" : "default",
                  }}
                >
                  {isFavorite(pet.id) ? "В избранном" : "В избранное"}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}