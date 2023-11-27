/**
 * @module accountManagementHandlers
 * @description Event handlers for account management page UI elements.
 */

import { accBackButton } from "../utils/accountManagementElements.js";

export const handleAccountManagementEvents = () => {
    // Attach function to send the user back to the main page
    accBackButton.addEventListener("click", () => window.location.href = "index.html");
}