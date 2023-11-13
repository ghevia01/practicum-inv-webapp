/**
 * @module QRPageController
 * @description Coordinates between the QR Page view and model.
 */
import { video, canvas } from "../utils/qrPageElements.js";
import { getCameraStream, extractQueryParam } from "../utils/qrUtils.js";
import { createItemCard } from "../utils/createItemCard.js";
import {
  toggleQRScannerUI,
  toggleSectionVisibility,
} from "../modules/qrScannerUI.js";
import { scanQRCode } from "../modules/qrScannerModule.js";
import { fetchItemData } from "../services/inventoryServices.js";
import { handleQRPageEvents } from "../eventHandlers/qrPageHandlers.js";

import {
  resultsSection,
  noResultsSection,
  noResultsHeaderTxt,
  noResultsMessageTxt,
  errorHeaderTxt,
  errorMessageTxt,
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
  scanQRCode(video, canvas, onQrCodeDetected);

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
      scanQRCode(video, canvas, onQrCodeDetected);
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

// Function to process the response from the server
const processResponse = (data) => {
  // If the item exists, display the data, otherwise display a message
  if (!data.error) {
    displayItemData(data);
  } else if (data.error === "Item not found") {
    displayNoResultsMsg(noResultsHeaderTxt, noResultsMessageTxt);
  } else {
    displayNoResultsMsg(errorHeaderTxt, errorMessageTxt);
  }
};

/**
 * Updates UI and displays item data.
 * @param {Object} itemData - Item details
 * @returns {void}
 */
const displayItemData = (itemData) => {
  // Create the item card element
  const cardElement = createItemCard(itemData);

  // Clear the results section
  resultsSection.innerHTML = "";

  // Append the card element to the results section
  resultsSection.appendChild(cardElement);

  // Toggle visibility of UI sections
  toggleSectionVisibility(noResultsSection, false);
  toggleSectionVisibility(resultsSection, true);
};

/**
 * Displays a message in the UI indicating that no results were found.
 */
const displayNoResultsMsg = (headerTxt, messageTxt) => {
  // Update text content in the no results section
  noResultsSectionHeader.textContent = headerTxt;
  noResultsSectionMessage.textContent = messageTxt;

  // Toggle visibility of UI sections
  toggleSectionVisibility(resultsSection, false);
  toggleSectionVisibility(noResultsSection, true);
};

/**
 * Handles QR code detection and item data fetching.
 * @async
 * @param {string} data - QR code data
 * @returns {Promise<void>}
 */
const onQrCodeDetected = async (qrData) => {
  // Log the detected QR code data to console
  console.log(qrData);

  // Extract and validate the query parameter from the QR data
  try {
    // Extract the query parameter from the QR data
    const { queryKey, queryValue } = extractQueryParam(qrData);

    console.log("Query key:", queryKey);
    console.log("Query value:", queryValue);

    // Make the HTTP request to the server
    fetchItemData(
      "http://localhost/practicum-inv-webapp/api/read-inventory.php",
      queryKey,
      queryValue,
    )
      .then(processResponse)
      .catch((error) => {
        console.error("Error fetching data:", error);
        displayNoResultsMsg(errorHeaderTxt, errorMessageTxt);
      })
      .finally(() => stopScanning());
  } catch (error) {
    displayNoResultsMsg(errorHeaderTxt, errorMessageTxt);
  }
};

// Call the function to handle the qr page events
handleQRPageEvents();
