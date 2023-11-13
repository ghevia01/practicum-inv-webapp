// Set the camera to use the back camera
const FACING_MODE = "environment";

// Get the video stream from the camera
export const getCameraStream = async () => {
  return navigator.mediaDevices.getUserMedia({
    video: { facingMode: FACING_MODE },
  });
};

/**
 * Extracts the query parameter from the QR data.
 * @param {string} qrData - QR code data
 * @returns {string} - Extracted query string
 * @throws {Error} - If the QR data does not contain valid query parameters
 */
export const extractQueryParam = (qrData) => {
  try {
    // Parse the QR data as a URL
    const url = new URL(qrData);
    let queryKey, queryValue;

    // Check if the URL contains the ptag or location query parameter
    if (url.searchParams.has("ptag")) {
      queryKey = "ptag";
      queryValue = url.searchParams.get("ptag");
    } else if (url.searchParams.has("location")) {
      queryKey = "location";
      queryValue = url.searchParams.get("location");
    } else {
      throw new Error("QR code does not contain valid query parameters");
    }

    // Return the query parameter
    return { queryKey, queryValue };
  } catch (error) {
    console.error("Error processing QR data:", error);
    throw error;
  }
};
