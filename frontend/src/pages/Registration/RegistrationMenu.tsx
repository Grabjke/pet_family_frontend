import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import RegistrationPage from "./RegistrationPage";
import CIcon from "@coreui/icons-react";
import { NavLink } from "react-router-dom";
import { cilArrowCircleLeft } from "@coreui/icons";

export default function TabsWrappedLabel() {
  const [value, setValue] = React.useState("two");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    switch (value) {
      case "two":
        return <RegistrationPage />;
      case "three":
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full w-full py-6 px-10 justify-center items-center gap-4">
      <div className="self-start">
        <NavLink to="/" className="text-lg flex items-center">
          <CIcon
            icon={cilArrowCircleLeft}
            height={32}
            customClassName="nav-icon"
          />
        </NavLink>
      </div>

      <div className="w-full max-w-2xl">
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
            centered
            sx={{
              "& .MuiTabs-flexContainer": {
                justifyContent: "center",
              },
            }}
          >
            <Tab value="two" label="Регистрация пользователя" />
            <Tab value="three" label="Регистрация волонтера" />
          </Tabs>

          <Box sx={{ p: 3 }}>{renderTabContent()}</Box>
        </Box>
      </div>
    </div>
  );
}
