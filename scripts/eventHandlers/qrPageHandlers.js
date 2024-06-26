// Author: Gean Hevia

import { qrPageBackButton, scanButton, stopButton } from "../utils/qrPageElements.js";
import { startScanning, stopScanning } from "../controllers/qrPageController.js";
import { navigateToIndexPage } from "../utils/navigationUtils.js";

export const handleQRPageEvents = () => {
  // Handle navigation back to the index page
  qrPageBackButton.addEventListener("click", navigateToIndexPage);

  // Start scanning when the scan button is clicked
  scanButton.addEventListener("click", () => {
    try {
      startScanning();
    } catch (error) {
      console.error("Error starting scan:", error);
      // Handle error appropriately
    }
  });

  // Stop scanning when the stop button is clicked
  stopButton.addEventListener("click", () => {
    try {
      stopScanning();
    } catch (error) {
      console.error("Error stopping scan:", error);
      // Handle error appropriately
    }
  });
};

