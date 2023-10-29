import {
  qrScannerIcon,
  scanButton,
  stopButton,
  video,
} from "./qrPageElements.js";

// Toggle the UI between the scanning and the stopped states
export const toggleQRScannerUI = (isScanning) => {
  scanButton.classList.toggle("hidden", isScanning);
  qrScannerIcon.classList.toggle("hidden", isScanning);
  stopButton.classList.toggle("hidden", !isScanning);
  video.classList.toggle("hidden", !isScanning);
}; 

// Toggle the visibility of a section
export const toggleSectionVisibility = (section, isVisible) => {
  if (isVisible) {
    section.classList.remove("hidden");
    section.setAttribute("aria-hidden", "false");
  } else {
    section.classList.add("hidden");
  }
};
