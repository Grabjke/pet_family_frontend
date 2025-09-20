import { Stack, Pagination, Skeleton, Box } from "@mui/material";
import { useGetPetsQuery } from "../../modules/pets/api";
import type { Pet } from "../../modules/pets/petsSlice";
import { CardElement } from "./Card";
import { FilterBox } from "./FilterBox";
import { useState } from "react";
import { renderErrorState } from "../../utils/errorPageWithState";

export interface FilterParams {
  name?: string;
  description?: string;
  speciesId?: string;
  breedId?: string;
  colour?: string;
  healthInformation?: string;
  country?: string;
  city?: string;
  street?: string;
  zipCode?: string;
  weight?: number;
  height?: number;
  castration?: boolean;
  isVaccinated?: boolean;
  helpStatus?: number;
  sortBy?: string;
  sortDirection?: string;
}

export function MainPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const [filterParams, setFilterParams] = useState<FilterParams>({});

  const {
    data: petsData,
    isError,
    isLoading,
    isFetching,
  } = useGetPetsQuery({ page: currentPage, pageSize, ...filterParams });

  const petsArray = petsData?.result?.items || [];
  const totalCount = petsData?.result?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (event, value: number) => {
    setCurrentPage(value);
  };

  const handleFilterChange = (filters: FilterParams) => {
    setFilterParams(filters);
    setCurrentPage(1);
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
        {/* Изображение */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height="200px"
          sx={{ borderRadius: 0 }}
        />

        {/* Контент карточки */}
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
            {/* Вакцинация */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Skeleton variant="text" width="60%" height={20} />
            </Box>

            {/* Город */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Skeleton variant="text" width="40%" height={20} />
            </Box>

            {/* Статус */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Skeleton variant="text" width="70%" height={20} />
            </Box>
          </Box>

          {/* Кнопки внизу карточки */}
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

    if (petsArray.length === 0 && !isLoading) {
      return renderErrorState({
        name: "Нет данных",
        description:
          "По вашему запросу ничего не найдено. Попробуйте изменить параметры фильтрации.",
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
        {petsArray.map((pet: Pet) => (
          <CardElement key={pet.id} cardData={pet} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full p-4 gap-4">
      <div className="flex gap-4" style={{ height: "80vh" }}>
        <div className="w-1/4 min-w-[300px]">
          <FilterBox onFilterChange={handleFilterChange} />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden">
            <div className="h-full overflow-y-auto p-4 bg-white">
              {renderContent()}
            </div>
          </div>

          {totalPages > 1 && !isError && petsArray.length > 0 && (
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
      </div>
    </div>
  );
}
