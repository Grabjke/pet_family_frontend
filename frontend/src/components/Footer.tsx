import { Box } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import { NavLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";

export function Footer() {
  return (
    <footer className="bg-neutral-800 text-white p-6 flex justify-between items-center">
      <div className="flex gap-4">
        <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
          <XIcon className="text-white hover:text-gray-300 transition-colors" />
        </a>
        <a
          href="https://web.telegram.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TelegramIcon className="text-white hover:text-gray-300 transition-colors" />
        </a>
        <a
          href="https://github.com/Grabjke"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon className="text-white hover:text-gray-300 transition-colors" />
        </a>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold">Pet Family</span>
      </div>
    </footer>
  );
}
