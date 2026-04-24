import { useParams, useNavigate } from "react-router-dom";
import { useGetVolunteerByIdQuery } from "../../modules/volunteers/api";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  Avatar,
  Grid,
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
  Send,
} from "@mui/icons-material";
import { renderErrorState } from "../../utils/errorPageWithState";
import type { SocialNetwork } from "../../modules/volunteers/volunteersSlice";

export function VolunteerDetailPage() {
  const { volunteerId } = useParams<{ volunteerId: string }>();
  const navigate = useNavigate();

  const {
    data: volunteerData,
    isLoading,
    isError,
  } = useGetVolunteerByIdQuery(volunteerId!, {
    skip: !volunteerId,
  });

  const volunteer = volunteerData?.result;

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center h-full">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (isError || !volunteer) {
    return renderErrorState({
      name: "Волонтер не найден",
      description: "Не удалось загрузить информацию о волонтере",
    });
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "facebook":
        return <Facebook />;
      case "twitter":
        return <Twitter />;
      case "instagram":
        return <Instagram />;
      case "linkedin":
        return <LinkedIn />;
      default:
        return <Person />;
    }
  };

  const getSocialColor = (name: string) => {
    switch (name.toLowerCase()) {
      case "facebook":
        return "#1877F2";
      case "twitter":
        return "#1DA1F2";
      case "instagram":
        return "#E4405F";
      case "linkedin":
        return "#0A66C2";
      default:
        return "primary.main";
    }
  };

  const fullName = [
    volunteer.name,
    volunteer.surName,
    volunteer.patronymic,
  ]
    .filter(Boolean)
    .join(" ");

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
            src="/public/Manya-690x460-406558120.jpg"
          >
            <Person sx={{ fontSize: 40 }} />
          </Avatar>
          <Box>
            <Typography variant="h3" component="h1" className="font-bold">
              {fullName}
            </Typography>
            <Box className="flex items-center gap-2 mt-1">
              <Chip
                label={`${volunteer.experience} лет опыта`}
                color="primary"
                size="small"
              />
              <Chip
                label="Волонтер"
                color="success"
                size="small"
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
            <Box className="p-6">
              <Typography variant="h5" className="font-bold mb-4">
                О волонтере
              </Typography>
              <Typography variant="body1" color="text.secondary" className="leading-relaxed">
                {volunteer.description || "Описание отсутствует"}
              </Typography>
            </Box>
          </Paper>

          {volunteer.donationInfo && volunteer.donationInfo.length > 0 && (
            <Paper elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
              <Box className="p-6">
                <Typography variant="h5" className="font-bold mb-4">
                  Реквизиты для помощи
                </Typography>
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {volunteer.donationInfo.map((requisite, index) => (
                    <Box
                      key={index}
                      className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200"
                    >
                      <Box className="flex items-start justify-between">
                        <Box className="flex-1">
                          <Typography variant="subtitle2" className="font-bold mb-1">
                            {requisite.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className="font-mono text-sm"
                          >
                            {requisite.description}
                          </Typography>
                        </Box>
                        <Tooltip title="Скопировать">
                          <IconButton
                            size="small"
                            onClick={() => handleCopy(requisite.description)}
                            sx={{ ml: 2 }}
                          >
                            <ContentCopy fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
            <Box className="p-6">
              <Typography variant="h5" className="font-bold mb-4">
                Контакты
              </Typography>
              <Box className="flex flex-col gap-3">
                <Box className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <Box className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Email sx={{ color: "#1976D2" }} />
                  </Box>
                  <Box className="flex-1">
                    <Typography variant="caption" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body2" className="font-medium">
                      {volunteer.email}
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <Box className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Phone sx={{ color: "#388E3C" }} />
                  </Box>
                  <Box className="flex-1">
                    <Typography variant="caption" color="text.secondary">
                      Телефон
                    </Typography>
                    <Typography variant="body2" className="font-medium">
                      {volunteer.phoneNumber}
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                  <Box className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <WorkHistory sx={{ color: "#7B1FA2" }} />
                  </Box>
                  <Box className="flex-1">
                    <Typography variant="caption" color="text.secondary">
                      Опыт
                    </Typography>
                    <Typography variant="body2" className="font-medium">
                      {volunteer.experience} лет
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>

          {volunteer.socialNetworks && volunteer.socialNetworks.length > 0 && (
            <Paper elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
              <Box className="p-6">
                <Typography variant="h5" className="font-bold mb-4">
                  Социальные сети
                </Typography>
                <Box className="flex flex-col gap-2">
                  {volunteer.socialNetworks.map((social: SocialNetwork) => (
                    <Button
                      key={social.id}
                      variant="outlined"
                      fullWidth
                      size="small"
                      startIcon={getSocialIcon(social.name)}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        justifyContent: "flex-start",
                        borderColor: getSocialColor(social.name),
                        color: getSocialColor(social.name),
                        "&:hover": {
                          borderColor: getSocialColor(social.name),
                          bgcolor: `${getSocialColor(social.name)}10`,
                        },
                      }}
                    >
                      {social.name}
                    </Button>
                  ))}
                </Box>
              </Box>
            </Paper>
          )}

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
                  startIcon={<Star />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  В избранное
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}