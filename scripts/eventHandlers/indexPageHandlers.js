import { qrScannerPageBtn, manageUsersPageBtn } from "../utils/indexPageElements.js";

export function handleIndexPageEvents() {
  // Attach function to send the user to the QR scanner page
  qrScannerPageBtn.addEventListener("click", () => (window.location.href = "qr-scanner.html"));

  // Attach function to send the user to the accounts management page
  manageUsersPageBtn.addEventListener("click", () => (window.location.href = "account-manage.html"));
}