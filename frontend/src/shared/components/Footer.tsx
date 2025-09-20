import { Box } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import { NavLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";

export function Footer() {
  return (
    <Box
      component="footer"
      className="bg-neutral-800 text-white p-6 flex justify-between items-center"
    >
      <div className="flex gap-4">
        <NavLink to="https://x.com/" target="_blank">
          <XIcon />
        </NavLink>
        <NavLink to="https://web.telegram.org/" target="_blank">
          <TelegramIcon />
        </NavLink>
        <NavLink to="https://github.com/Grabjke" target="_blank">
          <GitHubIcon />
        </NavLink>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold">Pet Family</span>
      </div>
    </Box>
  );
}
