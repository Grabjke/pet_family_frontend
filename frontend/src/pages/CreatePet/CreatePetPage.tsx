import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from "@mui/material";
import {
  AddPhotoAlternate,
  Delete,
  ArrowBack,
  ArrowForward,
  Check,
} from "@mui/icons-material";
import { useAddPetMutation } from "../../modules/pets/api";
import {
  useGetSpeciesQuery,
  useGetBreedsBySpeciesIdQuery,
} from "../../modules/species/api";
import { authSelectors } from "../../modules/auth/authSlice";
import { useSelector } from "react-redux";
import type { AppState } from "../../shared/redux";
import { toast } from "react-toastify";
import { uploadPetPhotos } from "../../modules/files/api";
import { extractApiErrors, mapApiErrorsToFormErrors } from "../../utils/apiErrorUtils";

type FormData = {
  name: string;
  description: string;
  speciesId: string;
  breedId: string;
  colour: string;
  healthInformation: string;
  country: string;
  city: string;
  street: string;
  zipCode: string;
  weight: string;
  height: string;
  ownersPhoneNumber: string;
  castration: boolean;
  birthday: string;
  isVaccinated: boolean;
  helpStatus: number;
};

type FileWithPreview = {
  file: File;
  preview: string;
  uploaded: boolean;
  fileName?: string;
};

const steps = [
  "Основная информация",
  "Характеристики",
  "Местоположение",
  "Фотографии (необязательно)",
];

// Универсальный экстрактор ID из ответа addPet.
// Поддерживает форматы: строка, { result: "..." }, { id: "..." }, { value: "..." }
function extractPetId(response: unknown): string | null {
  if (typeof response === "string") return response;
  if (response && typeof response === "object") {
    const obj = response as Record<string, unknown>;
    if (typeof obj.result === "string") return obj.result;
    if (typeof obj.id === "string") return obj.id;
    if (typeof obj.value === "string") return obj.value;
    // Если result — это вложенный объект с id
    if (obj.result && typeof obj.result === "object") {
      const inner = obj.result as Record<string, unknown>;
      if (typeof inner.id === "string") return inner.id;
    }
  }
  return null;
}

export function CreatePetPage() {
  const navigate = useNavigate();
  const userId = useSelector((state: AppState) =>
    authSelectors.selectCurrentUserId(state),
  );
  const roles = useSelector((state: AppState) =>
    authSelectors.selectCurrentUserRoles(state),
  );

  const [addPet, { isLoading: isAdding }] = useAddPetMutation();
  const [isUploading, setIsUploading] = useState(false);

  const [activeStep, setActiveStep] = useState(0);
  const [createdPetId, setCreatedPetId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    speciesId: "",
    breedId: "",
    colour: "",
    healthInformation: "",
    country: "",
    city: "",
    street: "",
    zipCode: "",
    weight: "",
    height: "",
    ownersPhoneNumber: "",
    castration: false,
    birthday: "",
    isVaccinated: false,
    helpStatus: 1,
  });

  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  const { data: speciesData } = useGetSpeciesQuery({ page: 1, pageSize: 100 });
  const { data: breedsData } = useGetBreedsBySpeciesIdQuery(
    { id: formData.speciesId, page: 1, pageSize: 100 },
    { skip: !formData.speciesId },
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        uploaded: false,
      }));
      setSelectedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => {
      const fileToRemove = prev[index];
      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = "Имя обязательно";
      if (!formData.speciesId) newErrors.speciesId = "Вид обязателен";
      if (!formData.breedId) newErrors.breedId = "Порода обязательна";
      if (!formData.description.trim())
        newErrors.description = "Описание обязательно";
      if (!formData.colour.trim()) newErrors.colour = "Окрас обязателен";
      if (!formData.healthInformation.trim())
        newErrors.healthInformation = "Информация о здоровье обязательна";
    }

    if (step === 1) {
      if (!formData.weight || parseFloat(formData.weight) <= 0) {
        newErrors.weight = "Вес должен быть больше 0";
      }
      if (!formData.height || parseInt(formData.height) <= 0) {
        newErrors.height = "Рост должен быть больше 0";
      }
      if (!formData.birthday) newErrors.birthday = "Дата рождения обязательна";
    }

    if (step === 2) {
      if (!formData.country.trim()) newErrors.country = "Страна обязательна";
      if (!formData.city.trim()) newErrors.city = "Город обязателен";
      if (!formData.street.trim()) newErrors.street = "Улица обязательна";
      if (!formData.zipCode.trim())
        newErrors.zipCode = "Почтовый индекс обязателен";
      if (!formData.ownersPhoneNumber.trim()) {
        newErrors.ownersPhoneNumber = "Телефон обязателен";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep(activeStep)) return;

    if (activeStep === 2) {
      if (!userId || !roles.includes("volunteer")) {
        toast.error("Только волонтеры могут создавать карточки питомцев");
        return;
      }

      try {
        const response = await addPet({
          volunteerId: userId,
          name: formData.name,
          description: formData.description,
          speciesId: formData.speciesId,
          breedId: formData.breedId,
          colour: formData.colour,
          healthInformation: formData.healthInformation,
          address: {
            country: formData.country,
            city: formData.city,
            street: formData.street,
            zipCode: formData.zipCode,
          },
          weight: parseFloat(formData.weight),
          height: parseInt(formData.height),
          ownersPhoneNumber: formData.ownersPhoneNumber,
          castration: formData.castration,
          birthday: formData.birthday,
          isVaccinated: formData.isVaccinated,
          helpStatus: formData.helpStatus,
        }).unwrap();

        // ВАЖНО: addPet возвращает объект, а не строку.
        // Нужно вытащить именно ID, иначе в URL уйдёт [object Object].
        console.log("addPet response:", response);
        const petId = extractPetId(response);

        if (!petId) {
          toast.error("Не удалось получить ID созданного питомца");
          console.error("Не удалось извлечь petId из ответа:", response);
          return;
        }

        setCreatedPetId(petId);
        setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
      } catch (error) {
        // Обработка ошибок валидации от API
        const formErrors = mapApiErrorsToFormErrors(error);
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          // Показываем toast с первой ошибкой
          const firstError = Object.values(formErrors)[0];
          toast.error(firstError);
        } else {
          // Если нет ошибок формы, показываем общее сообщение
          const errorMessages = extractApiErrors(error);
          errorMessages.forEach((msg) => toast.error(msg));
        }
        console.error(error);
      }
    } else {
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!createdPetId || !userId) {
      toast.error("Ошибка: питомец не создан");
      return;
    }

    // Дополнительная защита: убеждаемся, что в URL уйдёт строка, а не объект
    if (typeof createdPetId !== "string") {
      toast.error("Ошибка: некорректный ID питомца");
      console.error("createdPetId не строка:", createdPetId);
      return;
    }

    try {
      if (selectedFiles.length > 0) {
        const formDataUpload = new FormData();
        selectedFiles.forEach((item) => {
          formDataUpload.append("files", item.file);
        });

        setIsUploading(true);
        await uploadPetPhotos(userId, createdPetId, formDataUpload);
      }

      toast.success("Карточка питомца успешно создана!");
      navigate(`/pets/${createdPetId}`);
    } catch (error) {
      toast.error("Ошибка при загрузке фотографий");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!roles.includes("volunteer")) {
    return (
      <Box className="p-6 max-w-4xl mx-auto">
        <Alert severity="error">
          Только волонтеры могут создавать карточки питомцев
        </Alert>
      </Box>
    );
  }

  return (
    <Box className="p-6 max-w-4xl mx-auto">
      <Typography variant="h4" component="h1" className="font-bold mb-6">
        Создание карточки питомца
      </Typography>

      <Paper elevation={2} sx={{ borderRadius: 3, p: 4, mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Paper elevation={2} sx={{ borderRadius: 3, p: 4 }}>
        {activeStep === 0 && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" className="font-bold mb-3">
                Основная информация
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Имя питомца"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth required error={!!errors.speciesId}>
                <InputLabel>Вид животного</InputLabel>
                <Select
                  name="speciesId"
                  value={formData.speciesId}
                  label="Вид животного"
                  onChange={(e) => {
                    const val = e.target.value as string;
                    setFormData((prev) => ({
                      ...prev,
                      speciesId: val,
                      breedId: "",
                    }));
                    if (errors.speciesId)
                      setErrors((prev) => ({ ...prev, speciesId: undefined }));
                  }}
                >
                  {speciesData?.result.items.map((species) => (
                    <MenuItem key={species.id} value={species.id}>
                      {species.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControl
                fullWidth
                required
                error={!!errors.breedId}
                disabled={!formData.speciesId}
              >
                <InputLabel>Порода</InputLabel>
                <Select
                  name="breedId"
                  value={formData.breedId}
                  label="Порода"
                  onChange={(e) => {
                    const val = e.target.value as string;
                    setFormData((prev) => ({ ...prev, breedId: val }));
                    if (errors.breedId)
                      setErrors((prev) => ({ ...prev, breedId: undefined }));
                  }}
                >
                  {breedsData?.result.items.map((breed) => (
                    <MenuItem key={breed.id} value={breed.id}>
                      {breed.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Окрас"
                name="colour"
                value={formData.colour}
                onChange={handleInputChange}
                error={!!errors.colour}
                helperText={errors.colour}
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Описание"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                error={!!errors.description}
                helperText={errors.description}
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Информация о здоровье"
                name="healthInformation"
                value={formData.healthInformation}
                onChange={handleInputChange}
                error={!!errors.healthInformation}
                helperText={errors.healthInformation}
                required
              />
            </Grid>
          </Grid>
        )}

        {activeStep === 1 && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" className="font-bold mb-3">
                Характеристики
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Вес (кг)"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                error={!!errors.weight}
                helperText={errors.weight}
                required
                slotProps={{ htmlInput: { min: 0, step: 0.1 } }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Рост (см)"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                error={!!errors.height}
                helperText={errors.height}
                required
                slotProps={{ htmlInput: { min: 0 } }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                type="date"
                label="Дата рождения"
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                error={!!errors.birthday}
                helperText={errors.birthday}
                required
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControlLabel
                control={
                  <Switch
                    name="castration"
                    checked={formData.castration}
                    onChange={handleInputChange}
                  />
                }
                label="Кастрирован/Стерилизован"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControlLabel
                control={
                  <Switch
                    name="isVaccinated"
                    checked={formData.isVaccinated}
                    onChange={handleInputChange}
                  />
                }
                label="Вакцинирован"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" className="font-bold mb-3 mt-4">
                Статус помощи
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Статус</InputLabel>
                <Select
                  name="helpStatus"
                  value={formData.helpStatus}
                  label="Статус"
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setFormData((prev) => ({ ...prev, helpStatus: val }));
                  }}
                >
                  <MenuItem value={1}>Нужна медицинская помощь</MenuItem>
                  <MenuItem value={2}>Нужен дом</MenuItem>
                  <MenuItem value={3}>Находится в добрых руках</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}

        {activeStep === 2 && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" className="font-bold mb-3">
                Местоположение
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Страна"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                error={!!errors.country}
                helperText={errors.country}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Город"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                error={!!errors.city}
                helperText={errors.city}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Улица"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                error={!!errors.street}
                helperText={errors.street}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Почтовый индекс"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                error={!!errors.zipCode}
                helperText={errors.zipCode}
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" className="font-bold mb-3 mt-4">
                Контакты
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Телефон владельца"
                name="ownersPhoneNumber"
                value={formData.ownersPhoneNumber}
                onChange={handleInputChange}
                error={!!errors.ownersPhoneNumber}
                helperText={errors.ownersPhoneNumber}
                required
              />
            </Grid>
          </Grid>
        )}

        {activeStep === 3 && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6" className="font-bold mb-3">
                Фотографии (необязательно)
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="mb-3"
              >
                Вы можете добавить фотографии позже
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  border: "2px dashed",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 4,
                  textAlign: "center",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "action.hover",
                  },
                }}
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileSelect}
                />
                <AddPhotoAlternate
                  sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Нажмите для выбора фотографий
                </Typography>
              </Box>

              {selectedFiles.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    {selectedFiles.map((item, index) => (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <Card>
                          <CardMedia
                            component="img"
                            height="200"
                            image={item.preview}
                            alt={`Preview ${index + 1}`}
                          />
                          <CardContent sx={{ p: 1 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="caption"
                                noWrap
                                sx={{ flex: 1, mr: 1 }}
                              >
                                {item.file.name}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => handleRemoveFile(index)}
                                color="error"
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Grid>
          </Grid>
        )}

        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 4 }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            disabled={isAdding || isUploading}
          >
            Отмена
          </Button>
          {activeStep > 0 && (
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={isAdding || isUploading}
              startIcon={<ArrowBack />}
            >
              Назад
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isAdding || isUploading}
              endIcon={<ArrowForward />}
            >
              Далее
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isAdding || isUploading}
              startIcon={
                isAdding || isUploading ? (
                  <CircularProgress size={20} />
                ) : (
                  <Check />
                )
              }
            >
              {isAdding || isUploading ? "Создание..." : "Создать карточку"}
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
