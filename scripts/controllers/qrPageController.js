/**
 * @module QRPageController
 * @description Coordinates between the QR Page view and model.
 */

import { video, canvas } from "../utils/qrPageElements.js";
import { getCameraStream } from "../utils/getCameraStream.js";
import { toggleQRScannerUI, toggleSectionVisibility } from "../utils/toggleQrScannerUI.js";
import { scanQRCode } from "../modules/qrScannerModule.js";
import { fetchItemData } from "../services/fetchItemData.js";
import { handleQRPageEvents } from "../eventHandlers/qrPageHandlers.js";

import {
  scanResultsSection,
  devicePTag,
  deviceModel,
  deviceDescription,
  deviceSerial_No,
  deviceStatus,
  deviceLocation,
  deviceComments,
  noResultsSection,
} from "../utils/qrPageElements.js";

/**
 * Initializes camera and video stream.
 * @async
 * @returns {Promise<void>}
 */
const initializeCameraAndStream = async () => {
  // Get the video stream from the camera
  const stream = await getCameraStream();

  // Sets the video elements src attribute to the stream from the camera
  video.srcObject = stream;

  // Play the video stream
  await video.play();

  // Hide the QR icon, toggle start button and show the video stream
  toggleQRScannerUI(true);
};

/**
 * Handles 'loadedmetadata' event for video.
 * @returns {void}
 */
const handleVideoMetadataLoaded = () => {
  scanQRCode(video, canvas, onQRCodeDetected);

  // Remove the 'loadedmetadata' event listener to prevent multiple invocations and improve performance.
  video.removeEventListener("loadedmetadata", handleVideoMetadataLoaded);
};

/**
 * Start scanning the video stream for QR codes.
 * @async
 * @export
 * @returns {Promise<void>}
 */
export const startScanning = async () => {
  try {
    console.log("Start scanning...");

    // Initialize the camera and stream
    await initializeCameraAndStream();

    // Check if the video metadata is already loaded
    if (video.readyState >= video.HAVE_ENOUGH_DATA) {
      scanQRCode(video, canvas, onQRCodeDetected);
    } else {
      // Add event listener to the video element, wait for the metadata to load, then start scanning
      video.addEventListener("loadedmetadata", handleVideoMetadataLoaded);
    }
  } catch (err) {
    console.error("Error accessing the camera: ", err);
    toggleQRScannerUI(false);
  }
};

/**
 * Stop the video stream and update the UI.
 * @export
 * @returns {void}
 */
export const stopScanning = () => {
  // Get the video stream
  const stream = video.srcObject;

  // Stop all media tracks in the stream
  const tracks = stream.getTracks();
  tracks.forEach((track) => track.stop());

  // Remove the stream from the video element
  video.srcObject = null;

  // Hide the video stream and show the start button
  toggleQRScannerUI(false);
};

/**
 * Handles QR code detection and item data fetching.
 * @async
 * @param {string} data - QR code data
 * @returns {Promise<void>}
 */
const onQRCodeDetected = async (data) => {
  // Log the detected QR code data to console
  console.log(data);

  try {
    const itemData = await fetchItemData(
      "http://localhost/practicum-inv-webapp/api/getItemByPtag.php",
      data
    );

    // If the item exists, display the data, otherwise display a message
    if (itemData.error === "Item not found") {
      displayNoResultsMsg();
    } else {
      displayItemData(itemData);
    }

    console.log(itemData);
  } catch (error) {
    // Handle errors like network issues, server down, etc.
    console.error("Error fetching item data:", error);
  } finally {
    // Always stop scanning, whether or not we found an item or encountered an error
    stopScanning(video);
  }
};

/**
 * Updates UI and displays item data.
 * @param {Object} itemData - Item details
 * @returns {void}
 */
const displayItemData = (itemData) => {
  // Update text content for each item attribute
  devicePTag.textContent = itemData.Ptag;
  deviceModel.textContent = itemData.Model;
  deviceDescription.textContent = itemData.Description;
  deviceSerial_No.textContent = itemData.Serial_No;
  deviceStatus.textContent = itemData.Status;
  deviceLocation.textContent = itemData.Location;
  deviceComments.textContent = itemData.Comments;

  // Toggle visibility of UI sections
  toggleSectionVisibility(noResultsSection, false);
  toggleSectionVisibility(scanResultsSection, true);
};

/**
 * Displays a message in the UI indicating that no results were found.
 */
const displayNoResultsMsg = () => {
  // Toggle visibility of UI sections
  toggleSectionVisibility(scanResultsSection, false);
  toggleSectionVisibility(noResultsSection, true);
};

// Call the function to handle the qr page events
handleQRPageEvents();
