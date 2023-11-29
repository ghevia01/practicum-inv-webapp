// Author: Gean Hevia

import { qrScannerPageBtn, manageInventoryPageBtn, manageUsersPageBtn, reportsPageBtn, logoutBtn } from "../utils/indexPageElements.js";

export function handleIndexPageEvents() {
  // Attach function to send the user to the QR scanner page
  qrScannerPageBtn.addEventListener("click", () => (window.location.href = "qr-scanner.html"));

  // Attach function to send the user to the inventory management page
  manageInventoryPageBtn.addEventListener("click", () => (window.location.href = "inventory-management.html"));
  
  // Attach function to send the user to the accounts management page
  manageUsersPageBtn.addEventListener("click", () => (window.location.href = "account-management.html"));
  
  // Attach function to send the user to the reports page
  reportsPageBtn.addEventListener("click", () => (window.location.href = "reports.html"));
  
  // Attach function to send the user to the logout page
  logoutBtn.addEventListener("click", () => (window.location.href = "../api/logout.php"));
}