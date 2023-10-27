import { video, canvas } from "../utils/qrPageElements.js";
import { getCameraStream } from "../utils/getCameraStream.js";
import { toggleQRScannerUI } from "../utils/toggleQrScannerUI.js";
import { scanQRCode } from "../modules/qrScannerModule.js";
import { fetchItemData } from "../services/fetchItemData.js";
import { handleQRPageEvents } from "../eventHandlers/qrPageHandlers.js";

// Start the video stream and the QR code scanning
export async function startScanning() {
  try {
    console.log("Start scanning...");

    // Get the video stream from the camera
    const stream = await getCameraStream();

    // Sets the video elements src to the stream from the camera
    video.srcObject = stream;

    // Await the video stream to play
    await video.play();

    // Hide the start button and show the video stream
    toggleQRScannerUI(true);

    // Check if the video metadata is already loaded
    if (video.readyState >= video.HAVE_ENOUGH_DATA) {
      // Start scanning the video stream for QR codes
      scanQRCode(video, canvas, onQRCodeDetected);
    } else {
      // Add event listener to the video element, wait for the metadata to load, then start scanning
      video.addEventListener("loadedmetadata", () => {
        scanQRCode(video, canvas, onQRCodeDetected);
      });
    }
  } catch (err) {
    console.error("Error accessing the camera: ", err);
    toggleQRScannerUI(false);
  }
}

// Function to stop the video stream
export function stopScanning() {
  // Get the video stream
  const stream = video.srcObject;

  // Stop all media tracks in the stream
  const tracks = stream.getTracks();
  tracks.forEach((track) => {
    track.stop();
  });

  // Remove the stream from the video element
  video.srcObject = null;

  // Hide the video stream and show the start button
  toggleQRScannerUI(false);
}

// Function to handle the detected QR code
const onQRCodeDetected = async (data) => {
  // Log the detected QR code data to console
  console.log(data);

  try {
    // Fetch the item data from the backend
    const itemData = await fetchItemData(
      "http://localhost/practicum-inv-webapp/api/getItemById.php",
      data
    );

    // Log the item data to console
    console.log(itemData);
  } catch (error) {
    console.error("Error fetching item data:", error);
  }

  // Stop the video stream
  stopScanning(video);
};

// Call the function to handle the qr page events
handleQRPageEvents();