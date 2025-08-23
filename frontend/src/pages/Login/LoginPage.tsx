import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CIcon } from "@coreui/icons-react";
import { cilArrowCircleLeft } from "@coreui/icons";

type LoginFields = {
  email: string;
  password: string;
};

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
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
          <TextField
            label="Email"
            {...(register("email"), { required: true })}
            error={!!errors.email}
            helperText={errors.email?.message}
            variant="standard"
            fullWidth
          />
          <TextField
            label="Пароль"
            error={!!errors.password}
            helperText={errors.password?.message}
            variant="standard"
            fullWidth
            {...(register("password"), { required: true })}
          />
          <Button type="submit" variant="outlined" color="inherit">
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
}
