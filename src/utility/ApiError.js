export const handleApiError = (error) => {
  if (error.response) {
    const message =
      error.response.data?.message || "Server error. Please try again.";
    throw new Error(message);
  } else if (error.request) {
    // Request made, no response received
    throw new Error("No response from server. Check your connection.");
  } else {
    // Anything else (setup, parsing, etc.)
    throw new Error(error.message || "Something went wrong");
  }
};
