import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import {
  Person,
  Logout,
  Favorite,
  Pets,
  Add,
  Group,
  HelpOutline,
  ArrowForward,
  Bookmark,
  Badge as BadgeIcon,
} from "@mui/icons-material";
import { useAppSelector } from "../../shared/redux";
import { authSelectors } from "../../modules/auth/authSlice";
import { useFavorites } from "../../shared/hooks/useFavorites";
import { useLogout } from "../../modules/auth/useLogout";

// Универсальная карточка-секция (как в Pet/Volunteer pages)
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

// Карточка статистики
function StatCard({
  icon,
  value,
  label,
  iconColor,
  onClick,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  iconColor: string;
  onClick?: () => void;
}) {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.2s ease",
        height: "100%",
        "&:hover": onClick
          ? {
              borderColor: "primary.light",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            }
          : {},
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: "action.hover",
            color: iconColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontSize: { xs: "1.75rem", md: "2rem" },
            }}
          >
            {value}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", fontWeight: 500 }}
          >
            {label}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

// Кнопка быстрого действия (плитка)
function ActionTile({
  icon,
  title,
  description,
  onClick,
  color = "primary.main",
  primary = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  color?: string;
  primary?: boolean;
}) {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: "1px solid",
        borderColor: primary ? "transparent" : "divider",
        background: primary
          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          : "background.paper",
        color: primary ? "white" : "text.primary",
        cursor: "pointer",
        transition: "all 0.2s ease",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 2,
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: primary
            ? "0 8px 24px rgba(102,126,234,0.3)"
            : "0 4px 16px rgba(0,0,0,0.06)",
          borderColor: primary ? "transparent" : "primary.light",
        },
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: primary ? "rgba(255,255,255,0.2)" : "action.hover",
          color: primary ? "white" : color,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.25 }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: primary ? "rgba(255,255,255,0.85)" : "text.secondary",
            display: "block",
            lineHeight: 1.3,
          }}
        >
          {description}
        </Typography>
      </Box>
      <ArrowForward
        sx={{
          fontSize: 18,
          opacity: 0.6,
          flexShrink: 0,
        }}
      />
    </Paper>
  );
}

const ROLE_LABELS: Record<string, string> = {
  volunteer: "Волонтёр",
  admin: "Администратор",
  user: "Пользователь",
};

export function ProfilePage() {
  const navigate = useNavigate();
  const userId = useAppSelector(authSelectors.selectCurrentUserId);
  const roles = useAppSelector(authSelectors.selectCurrentUserRoles);
  const { favorites } = useFavorites();
  const { logout } = useLogout();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const petsFavorites = favorites.filter((f) => f.type === "pet");
  const volunteersFavorites = favorites.filter((f) => f.type === "volunteer");
  const isVolunteer = roles.includes("volunteer");

  // Сокращённый ID для отображения
  const shortId = userId ? `${userId.slice(0, 8)}…${userId.slice(-4)}` : "—";

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: "auto" }}>
      {/* Заголовок страницы */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.02em",
            fontSize: { xs: "1.75rem", md: "2.5rem" },
            mb: 0.5,
          }}
        >
          Мой профиль
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Управляйте своим аккаунтом и быстрым доступом к разделам
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Левая колонка — карточка профиля */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: { md: "sticky" }, top: { md: 24 } }}>
            <Stack spacing={3}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                }}
              ></Paper>
            </Stack>
          </Box>
        </Grid>

        {/* Правая колонка — статистика и действия */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Статистика */}
            <Section
              title="Статистика"
              action={
                <Button
                  size="small"
                  endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                  onClick={() => navigate("/favorites")}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    color: "text.secondary",
                  }}
                >
                  Все избранное
                </Button>
              }
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <StatCard
                    icon={<Pets />}
                    value={petsFavorites.length}
                    label="Питомцев в избранном"
                    iconColor="primary.main"
                    onClick={() => navigate("/favorites")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StatCard
                    icon={<Group />}
                    value={volunteersFavorites.length}
                    label="Волонтёров в избранном"
                    iconColor="success.main"
                    onClick={() => navigate("/favorites")}
                  />
                </Grid>
              </Grid>
            </Section>

            {/* Быстрые действия */}
            <Section title="Быстрые действия">
              <Grid container spacing={2}>
                {isVolunteer && (
                  <Grid item xs={12} sm={6}>
                    <ActionTile
                      icon={<Add />}
                      title="Добавить питомца"
                      description="Создать карточку нового подопечного"
                      onClick={() => navigate("/create-pet")}
                      primary
                    />
                  </Grid>
                )}
                {isVolunteer && (
                  <Grid item xs={12} sm={6}>
                    <ActionTile
                      icon={<Person />}
                      title="Мой профиль волонтера"
                      description="Просмотреть и редактировать профиль"
                      onClick={() => navigate(`/volunteers/${userId}`)}
                      color="success.main"
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={6}>
                  <ActionTile
                    icon={<Bookmark />}
                    title="Избранное"
                    description={`${favorites.length} сохранённых`}
                    onClick={() => navigate("/favorites")}
                    color="warning.main"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ActionTile
                    icon={<Group />}
                    title="Волонтёры"
                    description="Найти людей, которые помогают"
                    onClick={() => navigate("/volunteers")}
                    color="success.main"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ActionTile
                    icon={<Pets />}
                    title="Питомцы"
                    description="Все животные на платформе"
                    onClick={() => navigate("/pets")}
                    color="primary.main"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ActionTile
                    icon={<HelpOutline />}
                    title="Помощь"
                    description="Часто задаваемые вопросы"
                    onClick={() => navigate("/help")}
                    color="info.main"
                  />
                </Grid>
              </Grid>
            </Section>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
