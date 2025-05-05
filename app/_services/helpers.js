export async function uploadImageToImgBB(imageFile) {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image to ImgBB", response.statusText);
  }

  const data = await response.json();
  console.log("ImgBB response:", data);
  return data.data.url;
}
