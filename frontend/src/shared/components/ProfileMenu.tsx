import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import {
  AccountCircle,
  Logout,
  Add,
  Person,
  Favorite,
  Login,
} from "@mui/icons-material";
import { useAppSelector } from "../redux";
import { authSelectors } from "../../modules/auth/authSlice";
import { useLogout } from "../../modules/auth/useLogout";

export function ProfileMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isAuthenticated = useAppSelector(authSelectors.selectIsAuthenticated);
  const roles = useAppSelector(authSelectors.selectCurrentUserRoles);
  const isVolunteer = roles.includes("volunteer");
  const { logout } = useLogout();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCreatePet = () => {
    handleMenuClose();
    navigate("/create-pet");
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate("/profile");
  };

  const handleFavorites = () => {
    handleMenuClose();
    navigate("/favorites");
  };

  const handleLogin = () => {
    handleMenuClose();
    navigate("/login");
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    navigate("/login");
  };

  return [
    <IconButton key="icon-button" onClick={handleMenuOpen} size="large">
      <Avatar sx={{ width: 32, height: 32 }}>
        <AccountCircle />
      </Avatar>
    </IconButton>,

    <Menu
      key="menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          sx: {
            minWidth: 200,
            borderRadius: 2,
            mt: 1,
          },
        },
      }}
    >
      {!isAuthenticated ? (
        <MenuItem onClick={handleLogin}>
          <ListItemIcon>
            <Login fontSize="small" />
          </ListItemIcon>
          <ListItemText>Войти</ListItemText>
        </MenuItem>
      ) : (
        [
          <MenuItem key="profile" onClick={handleProfile}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <ListItemText>Профиль</ListItemText>
          </MenuItem>,

          <MenuItem key="favorites" onClick={handleFavorites}>
            <ListItemIcon>
              <Favorite fontSize="small" />
            </ListItemIcon>
            <ListItemText>Избранное</ListItemText>
          </MenuItem>,

          ...(isVolunteer
            ? [
                <Divider key="divider-1" />,
                <MenuItem key="create-pet" onClick={handleCreatePet}>
                  <ListItemIcon>
                    <Add fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Создать карточку питомца</ListItemText>
                </MenuItem>,
              ]
            : []),

          <Divider key="divider-2" />,
          <MenuItem key="logout" onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText>Выйти</ListItemText>
          </MenuItem>,
        ]
      )}
    </Menu>,
  ];
}
