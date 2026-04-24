import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  Container,
} from "@mui/material";
import {
  VolunteerActivism,
  Pets,
  Favorite,
  Home,
  MedicalServices,
  Restaurant,
  ContentCopy,
  Phone,
  Email,
  LocationOn,
  AccountBalance,
  CreditCard,
  QrCode,
  CheckCircle,
} from "@mui/icons-material";
import { useState } from "react";

export function HelpPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const paymentMethods = [
    {
      icon: <CreditCard sx={{ fontSize: 32 }} />,
      title: "Банковская карта",
      number: "4276 1234 5678 9012",
      bank: "Сбер",
      owner: "Иванов Иван Иванович",
      color: "#21a038",
    },
    {
      icon: <AccountBalance sx={{ fontSize: 32 }} />,
      title: "Счёт в банке",
      number: "4070 2810 1234 5678 9012",
      bank: "Тинькофф",
      owner: "Благотворительный фонд Pet Family",
      color: "#ffdd2d",
    },
    {
      icon: <QrCode sx={{ fontSize: 32 }} />,
      title: "QR-код для оплаты",
      number: "https://pay.petfamily.ru/donate",
      bank: "СБП",
      owner: "Моментальный перевод",
      color: "#6c5ce7",
    },
  ];

  const helpWays = [
    {
      icon: <Home sx={{ fontSize: 40 }} />,
      title: "Временный приют",
      description:
        "Предоставьте временный дом для животного, пока мы ищем для него постоянную семью",
      color: "#ff6b6b",
    },
    {
      icon: <MedicalServices sx={{ fontSize: 40 }} />,
      title: "Медицинская помощь",
      description:
        "Помогите оплатить ветеринарные услуги, лекарства или операции для наших подопечных",
      color: "#4ecdc4",
    },
    {
      icon: <Restaurant sx={{ fontSize: 40 }} />,
      title: "Корм и принадлежности",
      description:
        "Поддержите наших питомцев кормом, игрушками, ошейниками и другими необходимыми вещами",
      color: "#ffe66d",
    },
    {
      icon: <VolunteerActivism sx={{ fontSize: 40 }} />,
      title: "Стать волонтером",
      description:
        "Присоединяйтесь к нашей команде и помогайте в поиске домов, уходе за животными",
      color: "#a29bfe",
    },
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Pets sx={{ fontSize: 56, color: "primary.main" }} />
            </Box>
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: 700, mb: 2 }}
            >
              Как помочь?
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Каждое ваше действие может изменить чью-то жизнь. Выберите способ
              помощи, который вам ближе всего
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              gap: 2,
              mb: 6,
            }}
          >
            {helpWays.map((way, index) => (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  transition: "all 0.3s",
                  "&:hover": {
                    elevation: 4,
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    bgcolor: `${way.color}20`,
                    flexShrink: 0,
                  }}
                >
                  <Box sx={{ color: way.color }}>{way.icon}</Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {way.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {way.description}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: 700, textAlign: "center", mb: 4 }}
            >
              Финансовая поддержка
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 2,
              }}
            >
              {paymentMethods.map((method, index) => (
                <Card
                  key={index}
                  elevation={2}
                  sx={{
                    height: "100%",
                    borderTop: `4px solid ${method.color}`,
                    transition: "all 0.3s",
                    "&:hover": {
                      elevation: 4,
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Box sx={{ color: method.color }}>{method.icon}</Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: "1rem" }}
                      >
                        {method.title}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block", mb: 0.5 }}
                        >
                          Реквизиты
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: "monospace",
                              fontSize: "0.8rem",
                              wordBreak: "break-all",
                            }}
                          >
                            {method.number}
                          </Typography>
                          <Tooltip title="Скопировать">
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleCopy(method.number, method.title)
                              }
                              sx={{ ml: "auto" }}
                            >
                              <ContentCopy fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>

                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block", mb: 0.5 }}
                        >
                          Банк
                        </Typography>
                        <Typography variant="body2">{method.bank}</Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block", mb: 0.5 }}
                        >
                          Получатель
                        </Typography>
                        <Typography variant="body2">{method.owner}</Typography>
                      </Box>
                    </Box>

                    {copied === method.title && (
                      <Chip
                        icon={<CheckCircle fontSize="small" />}
                        label="Скопировано!"
                        color="success"
                        size="small"
                        sx={{ mt: 2 }}
                      />
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
              gap: 2,
              mb: 6,
            }}
          >
            <Paper elevation={2} sx={{ p: 3 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Phone sx={{ fontSize: 28, color: "primary.main" }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Телефон
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 0.5 }}>
                +7 (999) 123-45-67
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Пн-Пт: 9:00 - 18:00
              </Typography>
            </Paper>

            <Paper elevation={2} sx={{ p: 3 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Email sx={{ fontSize: 28, color: "primary.main" }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Email
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 0.5 }}>
                help@petfamily.ru
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ответим в течение 24 часов
              </Typography>
            </Paper>
          </Box>

          <Paper elevation={2} sx={{ p: 3, mb: 6 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <LocationOn
                sx={{ fontSize: 40, color: "primary.main", flexShrink: 0 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
                  Благотворительный фонд Pet Family
                </Typography>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  г. Москва, ул. Ленина, д. 42, офис 15
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Метро: Парк Культуры
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Индекс: 119049
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: "amber.50",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Favorite sx={{ fontSize: 18, color: "error.main" }} />
              <Typography variant="body2" color="text.secondary">
                Прием вещей и корма: ежедневно с 10:00 до 20:00
              </Typography>
            </Box>
          </Paper>

          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Спасибо за вашу помощь!
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 500, mx: "auto" }}
            >
              Вместе мы можем сделать мир лучше для наших пушистых друзей.
              Каждое пожертвование и каждый час волонтерской работы приносят
              реальную пользу.
            </Typography>
          </Box>
        </Container>
      </div>
    </div>
  );
}
