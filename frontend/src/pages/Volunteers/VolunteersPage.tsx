import { Stack, Pagination, Skeleton, Box } from "@mui/material";
import { useGetVolunteersQuery } from "../../modules/volunteers/api";
import type { Volunteer } from "../../modules/volunteers/volunteersSlice";
import { VolunteerCard } from "./VolunteerCard";
import { useState } from "react";
import { renderErrorState } from "../../utils/errorPageWithState";

export function VolunteersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const {
    data: volunteersData,
    isError,
    isLoading,
    isFetching,
  } = useGetVolunteersQuery({ page: currentPage, pageSize });

  const volunteersArray = volunteersData?.result?.items || [];
  const totalCount = volunteersData?.result?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (event, value: number) => {
    setCurrentPage(value);
  };

  const renderSkeletons = () => {
    return Array.from(new Array(pageSize)).map((_, index) => (
      <Box
        key={index}
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          overflow: "hidden",
          height: "380px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "350px",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height="200px"
          sx={{ borderRadius: 0 }}
        />

        <Box
          sx={{
            p: 3,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="text" width="70%" height={20} />
          </Box>

          <Skeleton
            variant="rectangular"
            width="100%"
            height={36}
            sx={{ borderRadius: "4px", marginTop: "auto" }}
          />
        </Box>
      </Box>
    ));
  };

  const renderContent = () => {
    if (isError) {
      return renderErrorState({
        name: "Ошибка получения данных",
      });
    }

    if (volunteersArray.length === 0 && !isLoading) {
      return renderErrorState({
        name: "Нет данных",
        description: "Волонтеры не найдены",
      });
    }

    if (isLoading || isFetching) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderSkeletons()}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {volunteersArray.map((volunteer: Volunteer) => (
          <VolunteerCard key={volunteer.id} volunteerData={volunteer} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full p-4 gap-4">
      <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden" style={{ height: "80vh" }}>
        <div className="h-full overflow-y-auto p-4 bg-white">
          {renderContent()}
        </div>
      </div>

      {totalPages > 1 && !isError && volunteersArray.length > 0 && (
        <Stack spacing={2} alignItems="center" className="py-4">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            disabled={isFetching}
          />
        </Stack>
      )}
    </div>
  );
}