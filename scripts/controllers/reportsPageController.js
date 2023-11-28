import { handleReportsPageEvents } from "../eventHandlers/reportsPageHandlers.js";
import { downloadLocationReport } from "../services/reportServices.js";
import { exportButton, locationsSelect } from "../utils/reportsPageElements.js";

// Add an event listener to the export button
exportButton.addEventListener("click", () => {
  // Get the selected location
  const location = locationsSelect.value;
  // Download the report for the selected location
  downloadLocationReport(selectedLocation);
});

// Call the function to handle the main page events
handleReportsPageEvents();
