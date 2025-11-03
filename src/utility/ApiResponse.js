export const handleApiResponse = (response) => {
  console.info("🚀 ~ handleApiResponse ~ response:", response);
  // debugger;
  if (response?.data?.success === false) {
    throw new Error(response.data.message || "Something went wrong");
  }

  console.info("🚀 ~ handleApiResponse ~ response.status:", response.status);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new Error("Unexpected API response");
};
