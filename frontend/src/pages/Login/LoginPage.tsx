import { Alert, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CIcon } from "@coreui/icons-react";
import { cilArrowCircleLeft } from "@coreui/icons";
import { useLoginMutation } from "../../modules/auth/api";
import { useAppDispatch } from "../../shared/redux";
import { authActions } from "../../modules/auth/authSlice";
import { toasSuccess } from "../../utils/toast";
import { getErrorMessage } from "../../utils/getErrorMessage";

type LoginFields = {
  email: string;
  password: string;
  roles: string[];
};

export function Login() {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onSubmit = async (data: LoginFields) => {
    const response = await login(data).unwrap();
    toasSuccess("Успешный вход");

    const tokenReceived = authActions.tokenReceived;
    const result = response.result!;

    dispatch(
      tokenReceived({
        accessToken: result.accessToken,
        userId: result.userId,
        roles: result.roles,
      })
    );

    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col h-full w-full py-6 px-10 justify-center items-start gap-4">
        <NavLink to="/" className="text-lg">
          <CIcon
            icon={cilArrowCircleLeft}
            height={32}
            customClassName="nav-icon"
          />
        </NavLink>
        <div className="flex flex-col flex-1 min-w-80 mx-auto items-center justify-center gap-9">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full items-center gap-7"
          >
            <div>
              <strong className="text-3xl font-bold text-black-300">
                Вход
              </strong>
            </div>
            <TextField
              label="Email"
              {...(register("email"), { required: true })}
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="standard"
              fullWidth
              {...register("email", {
                required: "Это поле обязательно для заполнения",
                validate: (value) => {
                  if (!value.includes("@")) {
                    return "Email должен содержать @";
                  }
                },
              })}
            />
            <TextField
              label="Пароль"
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="standard"
              type="password"
              fullWidth
              {...register("password", { required: true })}
            />
            <Button
              type="submit"
              variant="outlined"
              color="inherit"
              disabled={isLoading}
            >
              Войти
            </Button>
            {isError && (
              <Alert sx={{ width: "100%" }} variant="outlined" severity="error">
                Неудачный вход
              </Alert>
            )}
            <div className="text-center text-gray-600 mt-6">
              Еще не зарегистрированы?
              <NavLink
                to="/registration"
                className="ml-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Регистрация
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
