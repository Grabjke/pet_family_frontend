import { useState } from "react";
import { FilterBox } from "./FilterBox";
import { CardElement } from "./Card";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

export function MainPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value: number) => {
    setCurrentPage(value);
  };

  const getCardsForCurrentPage = () => {
    if (currentPage === 1) {
      return Array(9)
        .fill(0)
        .map((_, index) => <CardElement key={index} />);
    } else if (currentPage === 2) {
      return Array(3)
        .fill(0)
        .map((_, index) => <CardElement key={index} />);
    }
    return Array(6)
      .fill(0)
      .map((_, index) => <CardElement key={index} />);
  };

  return (
    <div className="flex flex-col h-full w-full p-4 gap-4">
      <div className="flex gap-4" style={{ height: "80vh" }}>
        {" "}
        <div className="w-1/4 min-w-[300px]">
          <FilterBox />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden">
            <div className="h-full overflow-y-auto p-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getCardsForCurrentPage()}
              </div>
            </div>
          </div>

          <Stack spacing={2} alignItems="center" className="py-4">
            {" "}
            <Pagination
              count={2}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
}
