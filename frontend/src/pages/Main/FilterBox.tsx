import {
  TextField,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

type FilterFields = {
  name?: string;
  description?: string;
  speciesId?: string;
  breedId?: string;
  colour?: string;
  healthInformation?: string;
  country?: string;
  city?: string;
  street?: string;
  zipCode?: string;
  weight?: number;
  height?: number;
  castration?: boolean;
  isVaccinated?: boolean;
  helpStatus?: string;
  sortBy?: string;
  sortDirection?: string;
};

export function FilterBox() {
  const speciesOptions = [
    { value: "", label: "Не выбрано" },
    { value: "1", label: "Кошки" },
    { value: "2", label: "Собаки" },
    { value: "3", label: "Грызуны" },
  ];

  const breedOptions = [
    { value: "", label: "Не выбрано" },
    { value: "1", label: "Персидская" },
    { value: "2", label: "Такса" },
    { value: "3", label: "Сиамская" },
  ];

  const helpStatusOptions = [
    { value: "", label: "Не выбрано" },
    { value: "1", label: "Нужна помощь" },
    { value: "2", label: "В процессе" },
    { value: "3", label: "Помощь оказана" },
  ];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FilterFields>({
    defaultValues: {
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
      weight: undefined,
      height: undefined,
      castration: false,
      isVaccinated: false,
      helpStatus: "",
      sortBy: "name",
      sortDirection: "asc",
    },
  });

  const onSubmit = (data: FilterFields) => {
    console.log("Filter data:", data);
  };

  const handleReset = () => {
    reset({
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
      weight: undefined,
      height: undefined,
      castration: false,
      isVaccinated: false,
      helpStatus: "",
      sortBy: "name",
      sortDirection: "asc",
    });
  };

  return (
    <Paper className="p-6 w-full max-w-md mx-auto h-[80vh] overflow-y-auto flex flex-col">
      <Typography variant="h6" className="mb-6 font-bold text-center">
        Фильтры поиска
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex-1 flex flex-col"
      >
        {/* Основной контент с прокруткой */}
        <div className="flex-1 overflow-y-auto pr-2 pb-4">
          {/* Поиск по имени */}
          <Box>
            <Typography variant="subtitle2" className="mb-3 font-medium">
              Поиск по имени
            </Typography>
            <TextField
              placeholder="Введите имя"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
              size="small"
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Сортировка */}
          <Box className="space-y-4">
            <Typography variant="subtitle2" className="font-medium">
              Сортировка
            </Typography>

            <Controller
              name="sortBy"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Сортировать по"
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="name">Имени</MenuItem>
                  <MenuItem value="species">Виду</MenuItem>
                  <MenuItem value="breed">Породе</MenuItem>
                  <MenuItem value="weight">Весy</MenuItem>
                  <MenuItem value="height">Росту</MenuItem>
                </TextField>
              )}
            />

            <Controller
              name="sortDirection"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Направление сортировки"
                  fullWidth
                  size="small"
                  variant="outlined"
                >
                  <MenuItem value="asc">По возрастанию</MenuItem>
                  <MenuItem value="desc">По убыванию</MenuItem>
                </TextField>
              )}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Вид и порода */}
          <Box className="space-y-4">
            <Typography variant="subtitle2" className="font-medium">
              Животное
            </Typography>

            <Controller
              name="speciesId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Вид животного"
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={{ mb: 2 }}
                >
                  {speciesOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="breedId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Порода"
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={{ mb: 2 }}
                >
                  {breedOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="helpStatus"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Статус помощи"
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={{ mb: 2, backgroundColor: "white" }}
                >
                  {helpStatusOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{ backgroundColor: "white" }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Box>
              <FormControlLabel
                control={<Checkbox size="small" {...register("castration")} />}
                label="Кастрирован/Стерилизована"
              />
              <FormControlLabel
                control={
                  <Checkbox size="small" {...register("isVaccinated")} />
                }
                label="Вакцинирован"
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Внешний вид */}
          <Box className="space-y-4">
            <Typography variant="subtitle2" className="font-medium">
              Внешний вид
            </Typography>

            <TextField
              placeholder="Окрас"
              {...register("colour")}
              error={!!errors.colour}
              helperText={errors.colour?.message}
              fullWidth
              size="small"
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <Box className="grid grid-cols-2 gap-4">
              <TextField
                placeholder="Вес (кг)"
                type="number"
                {...register("weight", {
                  valueAsNumber: true,
                  min: { value: 1, message: "Некорректный вес" },
                  max: { value: 100, message: "Некорректный вес" },
                })}
                error={!!errors.weight}
                helperText={errors.weight?.message}
                size="small"
                variant="outlined"
              />

              <TextField
                placeholder="Рост (см)"
                type="number"
                {...register("height", {
                  valueAsNumber: true,
                  min: { value: 1, message: "Некорректный рост" },
                })}
                error={!!errors.height}
                helperText={errors.height?.message}
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box className="space-y-4">
            <Typography variant="subtitle2" className="font-medium">
              Местоположение
            </Typography>

            <TextField
              placeholder="Страна"
              {...register("country")}
              error={!!errors.country}
              helperText={errors.country?.message}
              fullWidth
              size="small"
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <TextField
              placeholder="Город"
              {...register("city")}
              error={!!errors.city}
              helperText={errors.city?.message}
              fullWidth
              size="small"
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <TextField
              placeholder="Улица"
              {...register("street")}
              error={!!errors.street}
              helperText={errors.street?.message}
              fullWidth
              size="small"
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <TextField
              placeholder="Почтовый индекс"
              {...register("zipCode")}
              error={!!errors.zipCode}
              helperText={errors.zipCode?.message}
              fullWidth
              size="small"
              variant="outlined"
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box className="space-y-4">
            <Typography variant="subtitle2" className="font-medium">
              Здоровье
            </Typography>

            <TextField
              placeholder="Информация о здоровье"
              {...register("healthInformation")}
              error={!!errors.healthInformation}
              helperText={errors.healthInformation?.message}
              fullWidth
              size="small"
              variant="outlined"
              multiline
              rows={2}
              sx={{ mb: 2 }}
            />
          </Box>
        </div>

        {/* Кнопки, прижатые к низу */}
        <Box className="bg-white pt-4 border-t border-gray-200 -mx-6 px-6 mt-auto">
          <Box className="flex flex-col gap-3">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ py: 1.5 }}
            >
              Применить фильтры
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              fullWidth
              onClick={handleReset}
              sx={{ py: 1.5 }}
            >
              Сбросить фильтры
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
}
