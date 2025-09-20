import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { ContentBlock } from "./ContentBlock";
import { Footer } from "./Footer";
import { Menu } from "./Menu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type Props = {
  children: React.ReactNode;
};

export function RootLayout() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-col h-full px-2 sm:px-8 py-2 sm:py-5">
        <Menu />
        <ContentBlock>
          <Outlet />
          <ToastContainer />
        </ContentBlock>
      </div>
      <Footer />
    </div>
  );
}
