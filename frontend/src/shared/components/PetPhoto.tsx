import { useState, useEffect } from "react";
import { Box, Skeleton } from "@mui/material";
import { getPresignedUrl } from "../../modules/files/api";
import type { Photo } from "../../modules/pets/petsSlice";

interface PetPhotoProps {
  photos: Photo[] | undefined;
  alt?: string;
  sx?: any;
  className?: string;
}

const DEFAULT_PHOTO = "/1e7b92b6bc9796f0a7d78b9e386b870d.jpg";

export function PetPhoto({ photos, alt = "Pet photo", sx, className }: PetPhotoProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mainPhoto = photos?.find((photo) => photo.isMain) || photos?.[0];
  const fileName = mainPhoto?.pathToStorage?.path;

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!fileName) {
        setImageUrl(DEFAULT_PHOTO);
        return;
      }

      setIsLoading(true);
      try {
        const url = await getPresignedUrl(fileName);
        setImageUrl(url);
      } catch (error) {
        console.error("Failed to get presigned URL:", error);
        setImageUrl(DEFAULT_PHOTO);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImageUrl();
  }, [fileName]);

  if (isLoading && fileName) {
    return <Skeleton variant="rectangular" sx={{ ...sx }} className={className} />;
  }

  return (
    <Box
      component="img"
      src={imageUrl || DEFAULT_PHOTO}
      alt={alt}
      sx={sx}
      className={className}
      onError={() => setImageUrl(DEFAULT_PHOTO)}
    />
  );
}
