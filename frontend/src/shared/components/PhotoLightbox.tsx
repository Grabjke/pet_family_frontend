import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  Box,
  IconButton,
  Typography,
  Skeleton,
  Zoom,
} from "@mui/material";
import {
  Close as CloseIcon,
  NavigateBefore,
  NavigateNext,
  ZoomIn,
  ZoomOut,
} from "@mui/icons-material";
import { getPresignedUrl } from "../../modules/files/api";
import type { Photo } from "../../modules/pets/petsSlice";

interface PhotoLightboxProps {
  open: boolean;
  onClose: () => void;
  photos: Photo[];
  initialIndex?: number;
  petName?: string;
}

const DEFAULT_PHOTO = "/1e7b92b6bc9796f0a7d78b9e386b870d.jpg";

export function PhotoLightbox({
  open,
  onClose,
  photos,
  initialIndex = 0,
  petName = "Фото",
}: PhotoLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [imageUrls, setImageUrls] = useState<Record<number, string>>({});
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});
  const [zoom, setZoom] = useState(1);

  // Сброс состояния при открытии/закрытии
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
      setZoom(1);
    }
  }, [open, initialIndex]);

  // Загрузка URL для текущего фото
  useEffect(() => {
    const loadPhotoUrl = async (index: number) => {
      const photo = photos[index];
      if (!photo?.pathToStorage?.path) {
        setImageUrls((prev) => ({ ...prev, [index]: DEFAULT_PHOTO }));
        return;
      }

      setLoadingStates((prev) => ({ ...prev, [index]: true }));
      try {
        const url = await getPresignedUrl(photo.pathToStorage.path);
        setImageUrls((prev) => ({ ...prev, [index]: url }));
      } catch (error) {
        console.error("Failed to get presigned URL:", error);
        setImageUrls((prev) => ({ ...prev, [index]: DEFAULT_PHOTO }));
      } finally {
        setLoadingStates((prev) => ({ ...prev, [index]: false }));
      }
    };

    if (open && photos[currentIndex]) {
      if (!imageUrls[currentIndex]) {
        loadPhotoUrl(currentIndex);
      }
      // Предзагрузка следующего и предыдущего фото
      if (currentIndex > 0 && !imageUrls[currentIndex - 1]) {
        loadPhotoUrl(currentIndex - 1);
      }
      if (currentIndex < photos.length - 1 && !imageUrls[currentIndex + 1]) {
        loadPhotoUrl(currentIndex + 1);
      }
    }
  }, [open, currentIndex, photos, imageUrls]);

  const handleNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setZoom(1);
    }
  }, [currentIndex, photos.length]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setZoom(1);
    }
  }, [currentIndex]);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  // Обработка клавиш
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "+" || e.key === "=") {
        handleZoomIn();
      } else if (e.key === "-") {
        handleZoomOut();
      } else if (e.key === "0") {
        handleResetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, handleNext, handlePrevious, handleZoomIn, handleZoomOut, handleResetZoom]);

  const currentPhoto = photos[currentIndex];
  const currentUrl = imageUrls[currentIndex] || DEFAULT_PHOTO;
  const isLoading = loadingStates[currentIndex];
  const hasMultiplePhotos = photos.length > 1;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          bgcolor: "rgba(0, 0, 0, 0.95)",
          borderRadius: 0,
          overflow: "hidden",
          m: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
      TransitionComponent={Zoom}
      transitionDuration={{ enter: 300, exit: 200 }}
    >
      {/* Верхняя панель */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          zIndex: 10,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
        }}
      >
        <Typography variant="body1" sx={{ color: "white", fontWeight: 500 }}>
          {petName} · {currentIndex + 1} / {photos.length}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
            sx={{ color: "white" }}
          >
            <ZoomOut />
          </IconButton>
          <IconButton
            onClick={handleResetZoom}
            disabled={zoom === 1}
            sx={{ color: "white" }}
          >
            <Typography sx={{ color: "white", fontSize: "0.875rem", fontWeight: 600 }}>
              {Math.round(zoom * 100)}%
            </Typography>
          </IconButton>
          <IconButton
            onClick={handleZoomIn}
            disabled={zoom >= 3}
            sx={{ color: "white" }}
          >
            <ZoomIn />
          </IconButton>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Основная область с фото */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          cursor: zoom > 1 ? "grab" : "default",
        }}
        onClick={zoom > 1 ? handleResetZoom : undefined}
      >
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "rgba(255,255,255,0.1)",
            }}
          />
        ) : (
          <Box
            component="img"
            src={currentUrl}
            alt={`${petName} ${currentIndex + 1}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = DEFAULT_PHOTO;
            }}
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              transform: `scale(${zoom})`,
              transition: "transform 0.2s ease",
              userSelect: "none",
              WebkitUserDrag: "none",
            }}
            draggable={false}
          />
        )}
      </Box>

      {/* Кнопки навигации */}
      {hasMultiplePhotos && (
        <>
          <IconButton
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            sx={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              "&:disabled": { color: "rgba(255,255,255,0.3)" },
              zIndex: 10,
            }}
          >
            <NavigateBefore sx={{ fontSize: 40 }} />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={currentIndex === photos.length - 1}
            sx={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              "&:disabled": { color: "rgba(255,255,255,0.3)" },
              zIndex: 10,
            }}
          >
            <NavigateNext sx={{ fontSize: 40 }} />
          </IconButton>
        </>
      )}

      {/* Индикаторы (точки) */}
      {hasMultiplePhotos && photos.length > 1 && (
        <Box
          sx={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 1.5,
            zIndex: 10,
          }}
        >
          {photos.map((_, index) => (
            <Box
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setZoom(1);
              }}
              sx={{
                width: index === currentIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: index === currentIndex ? "white" : "rgba(255,255,255,0.4)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </Box>
      )}
    </Dialog>
  );
}
