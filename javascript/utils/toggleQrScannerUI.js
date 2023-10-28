import { qrScannerIcon, scanButton, stopButton, video } from "./qrPageElements.js";

// Toggle the UI between the scanning and the stopped states
export function toggleQRScannerUI(isScanning) {
  scanButton.classList.toggle("hidden", isScanning);
  qrScannerIcon.classList.toggle("hidden", isScanning);
  stopButton.classList.toggle("hidden", !isScanning);
  video.classList.toggle("hidden", !isScanning);
}
