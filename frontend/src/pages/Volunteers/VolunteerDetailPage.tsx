import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useGetVolunteerByIdQuery,
  useSoftDeletePetMutation,
  useUpdateMainInfoPetMutation,
} from "../../modules/volunteers/api";
import { useGetPetsQuery } from "../../modules/pets/api";
import { useGetSpeciesQuery } from "../../modules/species/api";
import { useGetBreedsBySpeciesIdQuery } from "../../modules/breed/api";
import type { Species } from "../../modules/species/speciesSlice";
import type { Breed } from "../../modules/breed/breedSlice";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  Avatar,
  Grid,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  TextField,
  Select,
  MenuItem as SelectMenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  Person,
  Email,
  WorkHistory,
  Phone,
  ContentCopy,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Star,
  StarBorder,
  Send,
  Pets,
  CheckCircle,
  Cancel,
  Add,
  ArrowBack,
  ArrowForward,
  LocationOn,
  Delete,
  MoreVert,
  Edit,
} from "@mui/icons-material";
import { renderErrorState } from "../../utils/errorPageWithState";
import type { SocialNetwork } from "../../modules/volunteers/volunteersSlice";
import { useFavorites } from "../../shared/hooks/useFavorites";
import { toast } from "react-toastify";
import { helpStatusMessages } from "../../utils/helpStatusMessages";
import { authSelectors } from "../../modules/auth/authSlice";
import { useSelector } from "react-redux";
import type { AppState } from "../../shared/redux";
import { PetPhoto } from "../../shared/components/PetPhoto";
import type { Photo } from "../../modules/pets/petsSlice";

// Аватар волонтёра — всегда из public-папки
const VOLUNTEER_AVATAR_URL = "/Manya-690x460-406558120.jpg";

// Карточка-секция (та же, что в PetDetailPage)
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
          gap: 2,
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

// Компактная карточка питомца
function PetCard({
  pet,
  onClick,
  onDelete,
  onEdit,
  isOwnProfile,
  menuOpen,
  onMenuOpen,
  onMenuClose,
  menuAnchorEl,
}: {
  pet: {
    id: string;
    name: string;
    isVaccinated: boolean;
    city?: string;
    helpStatus: string;
    photos?: Photo[];
  };
  onClick: () => void;
  onDelete: () => void;
  onEdit: () => void;
  isOwnProfile: boolean;
  menuOpen: boolean;
  onMenuOpen: (e: React.MouseEvent<HTMLElement>) => void;
  onMenuClose: () => void;
  menuAnchorEl: HTMLElement | null;
}) {
  const handleMenuClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onMenuOpen(e);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMenuClose();
    onDelete();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMenuClose();
    onEdit();
  };

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.2s ease",
        position: "relative",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: "primary.light",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        },
      }}
    >
      {isOwnProfile && (
        <IconButton
          onClick={handleMenuClick}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "background.paper",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 1,
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <MoreVert fontSize="small" />
        </IconButton>
      )}
      <Menu
        anchorEl={menuAnchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={menuOpen}
        onClose={onMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleEdit}>
          <Edit sx={{ mr: 1, fontSize: 20 }} />
          Редактировать
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Delete sx={{ mr: 1, fontSize: 20 }} />
          Удалить
        </MenuItem>
      </Menu>
      <Box
        sx={{
          height: 140,
          bgcolor: "action.hover",
        }}
      >
        <PetPhoto
          photos={pet.photos}
          alt={pet.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          spacing={0.75}
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Pets sx={{ fontSize: 16, color: "primary.main" }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
            {pet.name}
          </Typography>
        </Stack>
        <Stack spacing={0.5}>
          <Stack direction="row" alignItems="center" spacing={0.75}>
            {pet.isVaccinated ? (
              <CheckCircle sx={{ fontSize: 14, color: "success.main" }} />
            ) : (
              <Cancel sx={{ fontSize: 14, color: "text.disabled" }} />
            )}
            <Typography variant="caption" color="text.secondary">
              {pet.isVaccinated ? "Вакцинирован" : "Не вакцинирован"}
            </Typography>
          </Stack>
          {pet.city && (
            <Stack direction="row" alignItems="center" spacing={0.75}>
              <LocationOn sx={{ fontSize: 14, color: "text.secondary" }} />
              <Typography variant="caption" color="text.secondary" noWrap>
                {pet.city}
              </Typography>
            </Stack>
          )}
          <Chip
            label={helpStatusMessages[pet.helpStatus]}
            size="small"
            sx={{
              alignSelf: "flex-start",
              mt: 0.5,
              height: 22,
              fontSize: "0.7rem",
              fontWeight: 600,
            }}
          />
        </Stack>
      </Box>
    </Paper>
  );
}

const SOCIAL_META: Record<string, { icon: React.ReactNode; color: string }> = {
  facebook: { icon: <Facebook />, color: "#1877F2" },
  twitter: { icon: <Twitter />, color: "#1DA1F2" },
  instagram: { icon: <Instagram />, color: "#E4405F" },
  linkedin: { icon: <LinkedIn />, color: "#0A66C2" },
};

export function VolunteerDetailPage() {
  const { volunteerId } = useParams<{ volunteerId: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [petToDelete, setPetToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuPetId, setMenuPetId] = useState<string | null>(null);

  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    speciesId: "",
    breedId: "",
    colour: "",
    healthInformation: "",
    street: "",
    city: "",
    country: "",
    zipCode: "",
    weight: 0,
    height: 0,
    ownersPhoneNumber: "",
    castration: false,
    birthday: "",
    isVaccinated: false,
    helpStatus: 1,
  });

  const { data: speciesData } = useGetSpeciesQuery({ page: 1, pageSize: 100 });
  const species = speciesData?.result?.items || [];

  const { data: breedsData } = useGetBreedsBySpeciesIdQuery(
    { id: editForm.speciesId, page: 1, pageSize: 100 },
    { skip: !editForm.speciesId },
  );
  const breeds = breedsData?.result?.items || [];

  const userId = useSelector((state: AppState) =>
    authSelectors.selectCurrentUserId(state),
  );
  const roles = useSelector((state: AppState) =>
    authSelectors.selectCurrentUserRoles(state),
  );

  // Считаем профиль своим, если userId совпадает с volunteerId.
  // Проверку роли убираем — раз userId == volunteerId, это и есть владелец.
  const isOwnProfile = !!userId && userId === volunteerId;

  // 🔍 ВРЕМЕННЫЙ ЛОГ — посмотрите в консоли браузера, что приходит.
  // После того, как починим проблему, эту useEffect можно удалить.
  useEffect(() => {
    console.log("[VolunteerDetailPage] auth debug:", {
      userId,
      volunteerId,
      roles,
      isOwnProfile,
      userIdType: typeof userId,
      volunteerIdType: typeof volunteerId,
      areEqual: userId === volunteerId,
    });
  }, [userId, volunteerId, roles, isOwnProfile]);

  const {
    data: volunteerData,
    isLoading,
    isError,
  } = useGetVolunteerByIdQuery(volunteerId!, { skip: !volunteerId });

  const { data: petsData, isLoading: isPetsLoading } = useGetPetsQuery(
    {
      volunteerId: volunteerId!,
      page: 1,
      pageSize: 100,
    },
    { skip: !volunteerId },
  );

  const [softDeletePet] = useSoftDeletePetMutation();
  const [updateMainInfoPet] = useUpdateMainInfoPetMutation();

  const volunteer = volunteerData?.result;
  const pets = petsData?.result?.items || [];

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

  if (isError || !volunteer) {
    return renderErrorState({
      name: "Волонтёр не найден",
      description: "Не удалось загрузить информацию о волонтёре",
    });
  }

  const fullName = [volunteer.name, volunteer.surName, volunteer.patronymic]
    .filter(Boolean)
    .join(" ");

  const initials = [volunteer.name, volunteer.surName]
    .filter(Boolean)
    .map((s) => s[0])
    .join("")
    .toUpperCase();

  const favorited = isFavorite(volunteer.id);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Скопировано");
  };

  const handleFavoriteClick = () => {
    const isAdded = toggleFavorite({
      id: volunteer.id,
      type: "volunteer",
      name: fullName,
      imageUrl: VOLUNTEER_AVATAR_URL,
    });
    isAdded
      ? toast.success("Добавлено в избранное")
      : toast.info("Удалено из избранного");
  };

  const handleDeletePetClick = (pet: { id: string; name: string }) => {
    setPetToDelete(pet);
    setDeleteDialogOpen(true);
  };

  const handleEditPetClick = (pet: any) => {
    setMenuPetId(pet.id);
    setEditForm({
      name: pet.name,
      description: pet.description,
      speciesId: pet.speciesId,
      breedId: pet.breedId,
      colour: pet.colour,
      healthInformation: pet.healthInformation,
      street: pet.street,
      city: pet.city,
      country: pet.country,
      zipCode: pet.zipCode,
      weight: pet.weight,
      height: pet.height,
      ownersPhoneNumber: pet.ownersPhoneNumber,
      castration: pet.castration,
      birthday: pet.birthday,
      isVaccinated: pet.isVaccinated,
      helpStatus: parseInt(pet.helpStatus) || 1,
    });
    setEditDialogOpen(true);
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>, petId: string) => {
    setMenuAnchorEl(e.currentTarget);
    setMenuPetId(petId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuPetId(null);
  };

  const handleDeletePetConfirm = async () => {
    if (!petToDelete || !volunteerId) return;

    try {
      await softDeletePet({ volunteerId, petId: petToDelete.id }).unwrap();
      toast.success(`Питомец "${petToDelete.name}" удален`);
      setDeleteDialogOpen(false);
      setPetToDelete(null);
    } catch (error) {
      toast.error("Не удалось удалить питомца");
    }
  };

  const handleDeletePetCancel = () => {
    setDeleteDialogOpen(false);
    setPetToDelete(null);
  };

  const handleEditPetConfirm = async () => {
    if (!menuPetId || !volunteerId) return;

    try {
      await updateMainInfoPet({
        volunteerId,
        petId: menuPetId,
        name: editForm.name,
        description: editForm.description,
        speciesId: editForm.speciesId,
        breedId: editForm.breedId,
        colour: editForm.colour,
        healthInformation: editForm.healthInformation,
        address: {
          street: editForm.street,
          city: editForm.city,
          country: editForm.country,
          zipCode: editForm.zipCode,
        },
        weight: editForm.weight,
        height: editForm.height,
        ownersPhoneNumber: editForm.ownersPhoneNumber,
        castration: editForm.castration,
        birthday: editForm.birthday,
        isVaccinated: editForm.isVaccinated,
        helpStatus: editForm.helpStatus,
      }).unwrap();
      toast.success("Информация о питомце обновлена");
      setEditDialogOpen(false);
      handleMenuClose();
    } catch (error) {
      toast.error("Не удалось обновить информацию о питомце");
    }
  };

  const handleEditPetCancel = () => {
    setEditDialogOpen(false);
    handleMenuClose();
  };

  const getSocialMeta = (name: string) =>
    SOCIAL_META[name.toLowerCase()] || {
      icon: <Person />,
      color: "#6B7280",
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

      {/* Заголовок: аватар + имя + чипы */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          gap: { xs: 2.5, sm: 3 },
        }}
      >
        <Avatar
          src={VOLUNTEER_AVATAR_URL}
          sx={{
            width: { xs: 96, sm: 112 },
            height: { xs: 96, sm: 112 },
            bgcolor: "primary.main",
            fontSize: "2rem",
            fontWeight: 700,
            border: "3px solid",
            borderColor: "background.paper",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          {initials || <Person sx={{ fontSize: 48 }} />}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1.5 }}
            flexWrap="wrap"
            useFlexGap
          >
            <Chip
              label="Волонтёр"
              color="success"
              size="small"
              sx={{ fontWeight: 600 }}
            />
            <Chip
              label={`Опыт · ${volunteer.experience} лет`}
              size="small"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
            {isOwnProfile && (
              <Chip
                label="Это вы"
                size="small"
                color="primary"
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
            )}
          </Stack>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.02em",
              fontSize: { xs: "1.75rem", md: "2.5rem" },
              lineHeight: 1.15,
            }}
          >
            {fullName}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Левая колонка */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={3}>
            {/* О волонтёре */}
            <Section title="О волонтёре">
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.75 }}
              >
                {volunteer.description ||
                  "Волонтёр пока не добавил описание о себе."}
              </Typography>
            </Section>

            {/* Реквизиты */}
            {volunteer.donationInfo && volunteer.donationInfo.length > 0 && (
              <Section title="Реквизиты для помощи">
                <Grid container spacing={1.5}>
                  {volunteer.donationInfo.map((requisite, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: "1px solid",
                          borderColor: "divider",
                          bgcolor: "action.hover",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1.5,
                          height: "100%",
                        }}
                      >
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              display: "block",
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              mb: 0.5,
                            }}
                          >
                            {requisite.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: "monospace",
                              fontWeight: 600,
                              wordBreak: "break-all",
                            }}
                          >
                            {requisite.description}
                          </Typography>
                        </Box>
                        <Tooltip title="Скопировать">
                          <IconButton
                            size="small"
                            onClick={() => handleCopy(requisite.description)}
                            sx={{ flexShrink: 0 }}
                          >
                            <ContentCopy fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Section>
            )}

            {/* Питомцы */}
            <Section
              title={`Подопечные${pets.length ? ` · ${pets.length}` : ""}`}
              action={
                isOwnProfile ? (
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Add />}
                    onClick={() => navigate("/create-pet")}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      boxShadow: "none",
                    }}
                  >
                    Добавить
                  </Button>
                ) : null
              }
            >
              {isPetsLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 4,
                  }}
                >
                  <CircularProgress size={32} />
                </Box>
              ) : pets.length === 0 ? (
                <Box
                  sx={{
                    py: 4,
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  <Pets sx={{ fontSize: 40, opacity: 0.4, mb: 1 }} />
                  <Typography variant="body2">
                    У волонтёра пока нет подопечных
                  </Typography>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {pets.map((pet) => (
                    <Grid item xs={12} sm={6} md={4} key={pet.id}>
                      <PetCard
                        pet={pet}
                        onClick={() => navigate(`/pets/${pet.id}`)}
                        onDelete={() =>
                          handleDeletePetClick({ id: pet.id, name: pet.name })
                        }
                        onEdit={() => handleEditPetClick(pet)}
                        isOwnProfile={isOwnProfile}
                        menuOpen={menuPetId === pet.id && Boolean(menuAnchorEl)}
                        onMenuOpen={(e) => handleMenuOpen(e, pet.id)}
                        onMenuClose={handleMenuClose}
                        menuAnchorEl={
                          menuPetId === pet.id ? menuAnchorEl : null
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Section>
          </Stack>
        </Grid>

        {/* Правая колонка — sticky */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ position: { lg: "sticky" }, top: { lg: 24 } }}>
            <Stack spacing={3}>
              {/* CTA */}
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
                  Связаться с волонтёром
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ opacity: 0.9, mb: 2.5, lineHeight: 1.5 }}
                >
                  Напишите, чтобы узнать о подопечных или предложить помощь
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
                    icon={<Email />}
                    label="Email"
                    value={volunteer.email || "Не указан"}
                    iconColor="info.main"
                  />
                  <InfoRow
                    icon={<Phone />}
                    label="Телефон"
                    value={volunteer.phoneNumber || "Не указан"}
                    iconColor="success.main"
                  />
                  <InfoRow
                    icon={<WorkHistory />}
                    label="Опыт"
                    value={`${volunteer.experience} лет`}
                    iconColor="secondary.main"
                  />
                </Stack>
              </Section>

              {/* Соцсети */}
              {volunteer.socialNetworks &&
                volunteer.socialNetworks.length > 0 && (
                  <Section title="Социальные сети">
                    <Stack spacing={1}>
                      {volunteer.socialNetworks.map((social: SocialNetwork) => {
                        const meta = getSocialMeta(social.name);
                        return (
                          <Button
                            key={social.id}
                            variant="outlined"
                            fullWidth
                            startIcon={meta.icon}
                            endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              justifyContent: "space-between",
                              py: 1.25,
                              borderRadius: 2,
                              borderColor: "divider",
                              color: "text.primary",
                              textTransform: "none",
                              fontWeight: 600,
                              "& .MuiButton-startIcon": {
                                color: meta.color,
                                marginRight: 1.5,
                              },
                              "&:hover": {
                                borderColor: meta.color,
                                bgcolor: `${meta.color}10`,
                              },
                            }}
                          >
                            <Box
                              sx={{
                                flex: 1,
                                textAlign: "left",
                                textTransform: "capitalize",
                              }}
                            >
                              {social.name}
                            </Box>
                          </Button>
                        );
                      })}
                    </Stack>
                  </Section>
                )}
            </Stack>
          </Box>
        </Grid>
      </Grid>

      {/* Диалог подтверждения удаления */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeletePetCancel}
        PaperProps={{
          sx: { borderRadius: 3, maxWidth: 400 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Удалить питомца?</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Вы уверены, что хотите удалить питомца "{petToDelete?.name}"? Это
            действие нельзя отменить.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button
            onClick={handleDeletePetCancel}
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Отмена
          </Button>
          <Button
            onClick={handleDeletePetConfirm}
            variant="contained"
            color="error"
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог редактирования питомца */}
      <Dialog
        open={editDialogOpen}
        onClose={handleEditPetCancel}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Редактировать питомца</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Имя питомца"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth required>
                <InputLabel>Вид животного</InputLabel>
                <Select
                  value={editForm.speciesId}
                  label="Вид животного"
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      speciesId: e.target.value,
                      breedId: "",
                    })
                  }
                >
                  {species.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth required disabled={!editForm.speciesId}>
                <InputLabel>Порода</InputLabel>
                <Select
                  value={editForm.breedId}
                  label="Порода"
                  onChange={(e) =>
                    setEditForm({ ...editForm, breedId: e.target.value })
                  }
                >
                  {breeds.map((b) => (
                    <MenuItem key={b.id} value={b.id}>
                      {b.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Окрас"
                value={editForm.colour}
                onChange={(e) =>
                  setEditForm({ ...editForm, colour: e.target.value })
                }
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Описание"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Информация о здоровье"
                value={editForm.healthInformation}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    healthInformation: e.target.value,
                  })
                }
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Вес (кг)"
                value={editForm.weight}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    weight: parseFloat(e.target.value) || 0,
                  })
                }
                required
                slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Рост (см)"
                value={editForm.height}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    height: parseInt(e.target.value) || 0,
                  })
                }
                required
                slotProps={{ htmlInput: { min: 0 } }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="date"
                label="Дата рождения"
                value={editForm.birthday}
                onChange={(e) =>
                  setEditForm({ ...editForm, birthday: e.target.value })
                }
                required
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={editForm.castration}
                    onChange={(e) =>
                      setEditForm({ ...editForm, castration: e.target.checked })
                    }
                  />
                }
                label="Кастрирован/Стерилизован"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={editForm.isVaccinated}
                    onChange={(e) =>
                      setEditForm({ ...editForm, isVaccinated: e.target.checked })
                    }
                  />
                }
                label="Вакцинирован"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Статус</InputLabel>
                <Select
                  value={editForm.helpStatus}
                  label="Статус"
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      helpStatus: Number(e.target.value),
                    })
                  }
                >
                  <MenuItem value={1}>Нужна медицинская помощь</MenuItem>
                  <MenuItem value={2}>Нужен дом</MenuItem>
                  <MenuItem value={3}>Находится в добрых руках</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Страна"
                value={editForm.country}
                onChange={(e) =>
                  setEditForm({ ...editForm, country: e.target.value })
                }
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Город"
                value={editForm.city}
                onChange={(e) =>
                  setEditForm({ ...editForm, city: e.target.value })
                }
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Улица"
                value={editForm.street}
                onChange={(e) =>
                  setEditForm({ ...editForm, street: e.target.value })
                }
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Почтовый индекс"
                value={editForm.zipCode}
                onChange={(e) =>
                  setEditForm({ ...editForm, zipCode: e.target.value })
                }
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Телефон владельца"
                value={editForm.ownersPhoneNumber}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    ownersPhoneNumber: e.target.value,
                  })
                }
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button
            onClick={handleEditPetCancel}
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Отмена
          </Button>
          <Button
            onClick={handleEditPetConfirm}
            variant="contained"
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
