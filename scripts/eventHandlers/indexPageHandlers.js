import { qrScannerPageBtn, manageUsersPageBtn, reportsPageBtn } from "../utils/indexPageElements.js";

export function handleIndexPageEvents() {
  // Attach function to send the user to the QR scanner page
  qrScannerPageBtn.addEventListener("click", () => (window.location.href = "qr-scanner.html"));

  // Attach function to send the user to the accounts management page
  manageUsersPageBtn.addEventListener("click", () => (window.location.href = "account-manage.html"));

  // Attach function to send the user to the reports page
  reportsPageBtn.addEventListener("click", () => (window.location.href = "reports.html"));
}