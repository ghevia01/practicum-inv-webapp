import { qrScannerPageBtn, manageUsersPageButton } from "../utils/mainPageElements.js";

export function handleMainPageEvents() {
  // Attach function to send the user to the QR scanner page
  qrScannerPageBtn.addEventListener("click", () => (window.location.href = "qr-scanner.html"));

  // Attach function to send the user to the accounts management page
  manageUsersPageButton.addEventListener("click", () => (window.location.href = "account-manage.html"));
}