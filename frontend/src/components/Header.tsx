import AppBar from "@mui/material/AppBar";
import { NavLink } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export function Header() {
  return (
    <AppBar position="static">
      <div className="flex items-center justify-between p-4">
        <PetsIcon className="!w-8 !h-8" />

        <NavLink
          to="/"
          className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold"
        >
          Pet Family
        </NavLink>

        <div className="flex gap-4">
          <NavLink to="/login">
            <AccountCircleIcon className="!w-8 !h-8 cursor-pointer" />
          </NavLink>
          <LogoutIcon className="!w-8 !h-8 cursor-pointer" />
        </div>
      </div>
    </AppBar>
  );
}
