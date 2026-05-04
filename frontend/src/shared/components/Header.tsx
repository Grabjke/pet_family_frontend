import AppBar from "@mui/material/AppBar";
import { NavLink } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import { ProfileMenu } from "./ProfileMenu";

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

        <ProfileMenu />
      </div>
    </AppBar>
  );
}
