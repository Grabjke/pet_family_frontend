import { cilArrowCircleLeft } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { toasSuccess } from "../../utils/toast";
import { useForm } from "react-hook-form";
import { useRegistrarionMutation } from "../../modules/auth/api";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

type RegistrationFields = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const [registration, { isLoading, isError, error }] =
    useRegistrarionMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<RegistrationFields>();

  const password = watch("password");

  const onSubmit = async (data: RegistrationFields) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Пароли не совпадают",
      });
      return;
    }

    const { ...registrationData } = data;

    await registration(registrationData).unwrap();
    toasSuccess("Успешная регистрация");
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-col h-full w-full py-6 px-10 justify-center items-start gap-4">
        <div className="flex flex-col flex-1 min-w-80 mx-auto items-center justify-center gap-9">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full items-center gap-7"
          >
            <div>
              <strong className="text-3xl font-bold text-black-300">
                Регистрация
              </strong>
            </div>
            <TextField
              label="Имя"
              error={!!errors.userName}
              helperText={errors.userName?.message}
              variant="standard"
              fullWidth
              {...register("userName", {
                required: "Это поле обязательно для заполнения",
              })}
            />
            <TextField
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="standard"
              fullWidth
              {...register("email", {
                required: "Это поле обязательно для заполнения",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Введите корректный email адрес",
                },
              })}
            />
            <TextField
              label="Пароль"
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="standard"
              type={showPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("password", {
                required: "Это поле обязательно для заполнения",
                minLength: {
                  value: 6,
                  message: "Пароль должен содержать минимум 6 символов",
                },
              })}
            />

            <TextField
              label="Повторите пароль"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              variant="standard"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("confirmPassword", {
                required: "Подтвердите пароль",
                validate: (value) =>
                  value === password || "Пароли не совпадают",
              })}
            />
            {isError && (
              <Alert sx={{ width: "100%" }} variant="outlined" severity="error">
                {getErrorMessage(error)}
              </Alert>
            )}
            <Button
              type="submit"
              variant="outlined"
              color="inherit"
              disabled={isLoading}
            >
              Зарегистрироваться
            </Button>
            <div className="text-center text-gray-600 mt-6">
              Уже зарегистрированы?
              <NavLink
                to="/login"
                className="ml-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Войти
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
