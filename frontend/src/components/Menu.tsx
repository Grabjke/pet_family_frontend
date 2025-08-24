import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SavingsIcon from "@mui/icons-material/Savings";
import StarIcon from "@mui/icons-material/Star";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

export function Menu() {
  return (
    <Box className="flex w-full py-2 pl-5">
      <Box className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center text-black no-underline text-lg transition-all pb-1 border-b-2 px-3 ${
              isActive
                ? "font-semibold border-orange-500"
                : "font-normal border-transparent hover:border-orange-300"
            }`
          }
        >
          <HomeIcon className="mr-1 !text-xl" />
          Главная
        </NavLink>
        <NavLink
          to="/asd"
          className={({ isActive }) =>
            `text-black no-underline text-lg transition-all pb-1 border-b-2 px-3 ${
              isActive
                ? "font-semibold border-orange-500"
                : "font-normal border-transparent hover:border-orange-300"
            }`
          }
        >
          <EmojiPeopleIcon className="mr-1 !text-xl" />О волонтере
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex items-center text-black no-underline text-lg transition-all pb-1 border-b-2 px-2 ${
              isActive
                ? "font-semibold border-orange-500"
                : "font-normal border-transparent hover:border-orange-300"
            }`
          }
        >
          <StarIcon className="mr-1 !text-xl" />
          Избранное
        </NavLink>
        <NavLink
          to="/asd"
          className={({ isActive }) =>
            `flex items-center text-black no-underline text-lg transition-all pb-1 border-b-2 px-2 ${
              isActive
                ? "font-semibold border-orange-500"
                : "font-normal border-transparent hover:border-orange-300"
            }`
          }
        >
          <SavingsIcon className="mr-1 !text-xl" />
          Помочь
        </NavLink>
      </Box>
    </Box>
  );
}
