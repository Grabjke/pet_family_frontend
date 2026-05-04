const BASE_URL = "https://localhost:7000";
const BASE_URL_API = "https://localhost:7000";

export type PresignedUrlResponse = {
  result: string;
  errors: null;
  timeGenerated: string;
};

export type UploadFilesResponse = {
  fileNames: string[];
};

export type UploadPetPhotosResponse = {
  fileNames: string[];
};

export async function getPresignedUrl(fileName: string): Promise<string> {
  const response = await fetch(
    `${BASE_URL}/photo-link?fileName=${encodeURIComponent(fileName)}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to get presigned URL");
  }

  const data: PresignedUrlResponse = await response.json();
  return data.result;
}

export async function uploadFiles(
  formData: FormData,
): Promise<UploadFilesResponse> {
  const response = await fetch(`${BASE_URL}/photos`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload files");
  }

  return response.json();
}

export async function uploadPetPhotos(
  volunteerId: string,
  petId: string,
  formData: FormData,
): Promise<UploadPetPhotosResponse> {
  const response = await fetch(
    `${BASE_URL_API}/volunteer/${volunteerId}/pet/${petId}/photos`,
    {
      method: "POST",
      credentials: "include",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to upload pet photos");
  }

  return response.json();
}

export async function removeFiles(names: string[]): Promise<void> {
  const response = await fetch(
    `${BASE_URL}/photos?names=${names.map(encodeURIComponent).join(",")}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to remove files");
  }
}
