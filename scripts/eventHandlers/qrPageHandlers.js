/**
 * @module QRPageEventHandlers
 * @description Event handlers for QR Page UI elements.
 */

import { qrPageBackButton, scanButton, stopButton } from "../utils/qrPageElements.js";
import { startScanning, stopScanning } from "../controllers/qrPageController.js";

/**
 * Attach event handlers to the UI elements on the QR page.
 * @export
 * @returns {void}
 */
export const handleQRPageEvents = () => {
  // Attach function to send the user back to the index page
  qrPageBackButton.addEventListener("click", () => window.location.href = "index.html");

  // Attach the startScanning function to the button's click event
  scanButton.addEventListener("click", startScanning);

  // Attach the stopScanning function to the button's click event
  stopButton.addEventListener("click", () => stopScanning());
}
