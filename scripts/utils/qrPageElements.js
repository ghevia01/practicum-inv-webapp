// QR page elements

// QR scanner section elements
export const qrPageBackButton = document.getElementById("backButton");
export const qrScannerIcon = document.getElementById("qrScannerIcon");
export const video = document.getElementById("qrVideo");
export const canvas = document.getElementById("qrCanvas");
export const scanButton = document.getElementById("scanButton");
export const stopButton = document.getElementById("stopButton");

// Scan results section elements
export const resultsSection = document.getElementById("resultsSection");
export const resultsContainer = document.getElementById("resultsContainer");
export const devicePTag = document.getElementById("devicePTag");
export const deviceModel = document.getElementById("deviceModel");
export const deviceDescription = document.getElementById("deviceDescription");
export const deviceSerial_No = document.getElementById("deviceSerial_No");
export const deviceStatus = document.getElementById("deviceStatus");
export const deviceLocation = document.getElementById("deviceLocation");
export const deviceComments = document.getElementById("deviceComments");

// No results section elements
export const noResultsSection = document.getElementById("noResultsSection");
export const noResultsSectionHeader = document.getElementById("noResultsSectionHeader");
export const noResultsSectionMessage = document.getElementById("noResultsSectionMessage");

// Custom messages for no results section
export const noResultsHeaderTxt = "No Results Found";
export const noResultsMessageTxt = 
"We couldn't find any matching results for the scanned QR code. Please try again or check if the QR code is valid.";

// Constants for Error Message
export const errorHeaderTxt = "Error Occurred";
export const errorMessageTxt =
  "An error occurred while processing your request. Please try again later.";