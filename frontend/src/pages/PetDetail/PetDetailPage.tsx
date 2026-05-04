import { useParams, useNavigate } from "react-router-dom";
import { useGetPetByIdQuery } from "../../modules/pets/api";
import { useGetVolunteerByIdQuery } from "../../modules/volunteers/api";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Chip,
  Avatar,
  Grid,
  Stack,
  Divider,
  Paper,
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
  Home,
  Send,
  StarBorder,
  Person,
  ArrowBack,
  ArrowForward,
  Palette,
} from "@mui/icons-material";
import { helpStatusMessages } from "../../utils/helpStatusMessages";
import { renderErrorState } from "../../utils/errorPageWithState";
import { useFavorites } from "../../shared/hooks/useFavorites";
import { toast } from "react-toastify";
import { PetPhoto } from "../../shared/components/PetPhoto";
import { PhotoLightbox } from "../../shared/components/PhotoLightbox";
import { useState } from "react";

// Расчёт возраста по дате рождения
const calculateAge = (birthday: string): string => {
  const birth = new Date(birthday);
  const now = new Date();
  const years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth();
  const totalMonths = years * 12 + months;

  if (totalMonths < 12) {
    const m = Math.max(totalMonths, 0);
    const word = m === 1 ? "месяц" : m >= 2 && m <= 4 ? "месяца" : "месяцев";
    return `${m} ${word}`;
  }
  const y = years;
  const word = y === 1 ? "год" : y >= 2 && y <= 4 ? "года" : "лет";
  return `${y} ${word}`;
};

// Универсальная карточка-секция
function Section({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 3.5 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2.5,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, letterSpacing: "-0.01em" }}
        >
          {title}
        </Typography>
        {action}
      </Box>
      {children}
    </Paper>
  );
}

// Строка «иконка + лейбл + значение»
function InfoRow({
  icon,
  label,
  value,
  iconColor = "primary.main",
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  iconColor?: string;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 1.25 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "action.hover",
          color: iconColor,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", lineHeight: 1.2, mb: 0.25 }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

// Бейдж статуса
function StatusBadge({ active, label }: { active: boolean; label: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        py: 1.5,
        px: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: active ? "success.light" : "divider",
        bgcolor: active ? "success.50" : "transparent",
        transition: "all 0.2s",
      }}
    >
      {active ? (
        <CheckCircle sx={{ color: "success.main", fontSize: 22 }} />
      ) : (
        <Cancel sx={{ color: "text.disabled", fontSize: 22 }} />
      )}
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: active ? "success.dark" : "text.secondary",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export function PetDetailPage() {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);

  const {
    data: petData,
    isLoading,
    isError,
  } = useGetPetByIdQuery(petId!, { skip: !petId });

  const pet = petData?.result;

  const { data: volunteerData } = useGetVolunteerByIdQuery(
    pet?.volunteerId || "",
    { skip: !pet?.volunteerId },
  );

  const volunteer = volunteerData?.result;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (isError || !pet) {
    return renderErrorState({
      name: "Животное не найдено",
      description: "Не удалось загрузить информацию о животном",
    });
  }

  const handleFavoriteClick = () => {
    const isAdded = toggleFavorite({
      id: pet.id,
      type: "pet",
      name: pet.name,
      imageUrl: "/public/1e7b92b6bc9796f0a7d78b9e386b870d.jpg",
    });
    isAdded
      ? toast.success("Добавлено в избранное")
      : toast.info("Удалено из избранного");
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
        return <MedicalServices sx={{ fontSize: 18 }} />;
      case "2":
        return <Home sx={{ fontSize: 18 }} />;
      case "3":
        return <Favorite sx={{ fontSize: 18 }} />;
      default:
        return <Pets sx={{ fontSize: 18 }} />;
    }
  };

  const favorited = isFavorite(pet.id);
  const photos = pet.photos || [];
  const mainPhoto = photos[0];
  const galleryPhotos = photos.slice(1);

  const handleOpenLightbox = (index: number) => {
    setLightboxInitialIndex(index);
    setLightboxOpen(true);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: "auto" }}>
      {/* Кнопка «Назад» */}
      <Button
        onClick={() => navigate(-1)}
        startIcon={<ArrowBack />}
        sx={{
          mb: 3,
          color: "text.secondary",
          textTransform: "none",
          fontWeight: 500,
        }}
      >
        Назад к списку
      </Button>

      {/* Заголовок страницы */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 2 }}
          flexWrap="wrap"
          useFlexGap
        >
          <Chip
            label={helpStatusMessages[pet.helpStatus]}
            color={
              getHelpStatusColor(pet.helpStatus) as
                | "error"
                | "warning"
                | "success"
                | "default"
            }
            size="small"
            icon={getHelpStatusIcon(pet.helpStatus)}
            sx={{ fontWeight: 600 }}
          />
        </Stack>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.02em",
            mb: 1,
            fontSize: { xs: "2rem", md: "2.75rem" },
          }}
        >
          {pet.name}
        </Typography>
        {(pet.city || pet.street) && (
          <Stack
            direction="row"
            spacing={0.75}
            alignItems="center"
            sx={{ color: "text.secondary" }}
          >
            <LocationOn sx={{ fontSize: 18 }} />
            <Typography variant="body1">
              {[pet.city, pet.street].filter(Boolean).join(", ")}
            </Typography>
          </Stack>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Левая колонка */}
        <Grid item xs={12} lg={8}>
          <Stack spacing={3}>
            {/* Основное фото */}
            {mainPhoto && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "action.hover",
                }}
              >
                <Box
                  onClick={() => handleOpenLightbox(0)}
                  sx={{
                    width: "100%",
                    aspectRatio: { xs: "4 / 3", md: "16 / 10" },
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  <PetPhoto
                    photos={[mainPhoto]}
                    alt={pet.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>
              </Paper>
            )}

            {/* Полоса характеристик */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
              }}
            >
              <Grid container>
                {[
                  {
                    icon: <CalendarToday />,
                    label: "Возраст",
                    value: calculateAge(pet.birthday),
                    color: "primary.main",
                  },
                  {
                    icon: <Scale />,
                    label: "Вес",
                    value: `${pet.weight} кг`,
                    color: "success.main",
                  },
                  {
                    icon: <Height />,
                    label: "Рост",
                    value: `${pet.height} см`,
                    color: "info.main",
                  },
                  {
                    icon: <Palette />,
                    label: "Окрас",
                    value: pet.colour || "Не указан",
                    color: "warning.main",
                  },
                ].map((stat, i) => (
                  <Grid
                    item
                    xs={6}
                    md={3}
                    key={i}
                    sx={{
                      p: { xs: 2, md: 2.5 },
                      borderRight: {
                        xs: i % 2 === 0 ? "1px solid" : "none",
                        md: i < 3 ? "1px solid" : "none",
                      },
                      borderBottom: {
                        xs: i < 2 ? "1px solid" : "none",
                        md: "none",
                      },
                      borderColor: "divider",
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          bgcolor: "action.hover",
                          color: stat.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block", lineHeight: 1.2 }}
                        >
                          {stat.label}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: "0.95rem", md: "1.05rem" },
                            letterSpacing: "-0.01em",
                            lineHeight: 1.3,
                          }}
                          noWrap
                        >
                          {stat.value}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* О питомце */}
            <Section title="О питомце">
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.75 }}
              >
                {pet.description ||
                  "Описание пока не добавлено. Свяжитесь с волонтёром для подробной информации."}
              </Typography>
            </Section>

            {/* Здоровье */}
            <Section title="Здоровье и состояние">
              <Stack spacing={2.5}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <Box sx={{ flex: 1 }}>
                    <StatusBadge
                      active={pet.isVaccinated}
                      label="Вакцинирован"
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <StatusBadge
                      active={pet.castration}
                      label="Кастрирован / стерилизован"
                    />
                  </Box>
                </Stack>
                {pet.healthInformation && (
                  <>
                    <Divider />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7 }}
                    >
                      {pet.healthInformation}
                    </Typography>
                  </>
                )}
              </Stack>
            </Section>

            {/* Галерея */}
            {galleryPhotos.length > 0 && (
              <Section title={`Ещё фото · ${galleryPhotos.length}`}>
                <Grid container spacing={1.5}>
                  {galleryPhotos.map((photo, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <Box
                        onClick={() => handleOpenLightbox(index + 1)}
                        sx={{
                          aspectRatio: "1",
                          borderRadius: 2,
                          overflow: "hidden",
                          bgcolor: "action.hover",
                          cursor: "pointer",
                          transition: "transform 0.25s ease",
                          "&:hover": { transform: "scale(1.03)" },
                        }}
                      >
                        <PetPhoto
                          photos={[photo]}
                          alt={`${pet.name} ${index + 2}`}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Section>
            )}

            {/* Волонтёр */}
            {volunteer && (
              <Section title="Волонтёр">
                <Box
                  onClick={() => navigate(`/volunteers/${volunteer.id}`)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2.5,
                    p: 2,
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: "primary.main",
                      fontSize: "1.5rem",
                    }}
                    src="/public/Manya-690x460-406558120.jpg"
                  >
                    <Person />
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700, lineHeight: 1.3 }}
                      noWrap
                    >
                      {[volunteer.name, volunteer.surName, volunteer.patronymic]
                        .filter(Boolean)
                        .join(" ")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Опыт: {volunteer.experience} лет
                    </Typography>
                  </Box>
                  <ArrowForward
                    sx={{ color: "text.secondary", fontSize: 20 }}
                  />
                </Box>
              </Section>
            )}
          </Stack>
        </Grid>

        {/* Правая колонка — sticky */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ position: { lg: "sticky" }, top: { lg: 24 } }}>
            <Stack spacing={3}>
              {/* CTA-карточка */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Хотите помочь?
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ opacity: 0.9, mb: 2.5, lineHeight: 1.5 }}
                >
                  Свяжитесь с волонтёром, чтобы узнать больше о {pet.name}
                </Typography>
                <Stack spacing={1.25}>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    onClick={handleFavoriteClick}
                    startIcon={favorited ? <Star /> : <StarBorder />}
                    sx={{
                      py: 1.25,
                      color: "white",
                      borderColor: "rgba(255,255,255,0.5)",
                      fontWeight: 600,
                      textTransform: "none",
                      borderRadius: 2,
                      "&:hover": {
                        borderColor: "white",
                        bgcolor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    {favorited ? "В избранном" : "В избранное"}
                  </Button>
                </Stack>
              </Paper>

              {/* Контакты */}
              <Section title="Контакты">
                <Stack divider={<Divider />}>
                  <InfoRow
                    icon={<Phone />}
                    label="Телефон"
                    value={pet.ownersPhoneNumber || "Не указан"}
                  />
                  <InfoRow
                    icon={<LocationOn />}
                    label="Город"
                    value={pet.city || "Не указан"}
                    iconColor="warning.main"
                  />
                  {pet.street && (
                    <InfoRow
                      icon={<Home />}
                      label="Адрес"
                      value={pet.street}
                      iconColor="info.main"
                    />
                  )}
                </Stack>
              </Section>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <PhotoLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        photos={photos}
        initialIndex={lightboxInitialIndex}
        petName={pet.name}
      />
    </Box>
  );
}
