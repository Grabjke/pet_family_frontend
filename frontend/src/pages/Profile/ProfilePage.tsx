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
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Logout,
  Favorite,
  History,
} from "@mui/icons-material";
import { useAppSelector } from "../../shared/redux";
import { authSelectors } from "../../modules/auth/authSlice";
import { useFavorites } from "../../shared/hooks/useFavorites";
import { useLogout } from "../../modules/auth/useLogout";

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

  return (
    <Box className="p-6 max-w-6xl mx-auto">
      <Typography variant="h4" component="h1" className="font-bold mb-6">
        Мой профиль
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ borderRadius: 3, p: 4 }}>
            <Box className="flex flex-col items-center text-center">
              <Avatar
                sx={{ width: 120, height: 120, bgcolor: "primary.main", mb: 3 }}
              >
                <Person sx={{ fontSize: 60 }} />
              </Avatar>

              <Typography variant="h5" className="font-bold mb-2">
                Пользователь
              </Typography>

              <Box className="flex flex-wrap gap-2 mb-4">
                {roles.map((role) => (
                  <Chip
                    key={role}
                    label={role === "volunteer" ? "Волонтер" : role}
                    color="primary"
                    size="small"
                  />
                ))}
              </Box>

              <Typography variant="body2" color="text.secondary" className="mb-4">
                ID: {userId || "Не указан"}
              </Typography>

              <Divider sx={{ width: "100%", mb: 3 }} />

              <Box className="flex flex-col gap-2 w-full">
                <Button
                  variant="outlined"
                  fullWidth
                  color="error"
                  startIcon={<Logout />}
                  onClick={handleLogout}
                >
                  Выйти
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ borderRadius: 3, p: 4, mb: 3 }}>
            <Typography variant="h6" className="font-bold mb-4">
              Статистика
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <Box className="p-4 bg-blue-50 rounded-xl text-center">
                  <Favorite sx={{ fontSize: 32, color: "#1976D2", mb: 1 }} />
                  <Typography variant="h4" className="font-bold">
                    {petsFavorites.length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Питомцев в избранном
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box className="p-4 bg-green-50 rounded-xl text-center">
                  <Person sx={{ fontSize: 32, color: "#388E3C", mb: 1 }} />
                  <Typography variant="h4" className="font-bold">
                    {volunteersFavorites.length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Волонтеров в избранном
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={2} sx={{ borderRadius: 3, p: 4 }}>
            <Typography variant="h6" className="font-bold mb-4">
              Быстрые действия
            </Typography>
            <Grid container spacing={2}>
              {roles.includes("volunteer") && (
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => navigate("/create-pet")}
                    sx={{
                      py: 2,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Создать карточку питомца
                  </Button>
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  onClick={() => navigate("/favorites")}
                  sx={{
                    py: 2,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Избранное
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  onClick={() => navigate("/volunteers")}
                  sx={{
                    py: 2,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Волонтеры
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  onClick={() => navigate("/help")}
                  sx={{
                    py: 2,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Помощь
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
