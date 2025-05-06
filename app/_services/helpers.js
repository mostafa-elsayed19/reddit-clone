export async function uploadImageToCloudinary(imageFile) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();

  formData.append("upload_preset", uploadPreset);
  formData.append("file", imageFile);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary", response);
  }

  const data = await response.json();
  console.log("Cloudinary response:", data);
  return data.url;
}
