import { qrPageBackButton, scanButton, stopButton } from "../utils/qrPageElements.js";
import { startScanning, stopScanning } from "../controllers/qrPageController.js";

export function handleQRPageEvents() {
  // Attach function to send the user back to the main page
  qrPageBackButton.addEventListener("click", () => window.location.href = "main.html");

  // Attach the startScanning function to the button's click event
  scanButton.addEventListener("click", startScanning);

  // Attach the stopScanning function to the button's click event
  stopButton.addEventListener("click", () => stopScanning());
}
