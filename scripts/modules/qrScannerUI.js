// Author: Gean Hevia

import {
  qrScannerIcon,
  scanButton,
  stopButton,
  video,
  loadingScreen,
} from "../utils/qrPageElements.js";

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

// Toggle the visibility of the loading screen
export const toggleLoadingScreen = (isVisible) => {
  loadingScreen.classList.toggle("hidden", !isVisible);
};

export function showEditState(key, card, select, editIcon, cancelIcon) {
  // Get the field to active the edit state
  const fieldToEdit = card.querySelector(`[data-key='${key}']`);

  // Hide the edit icon and show the cancel icon
  editIcon.classList.add("hidden");
  cancelIcon.classList.remove("hidden");

  // Remove the field text and add the select element
  fieldToEdit.innerHTML = "";
  fieldToEdit.appendChild(select);

  // Show the select element
  select.classList.remove("hidden");
}

export function removeSaveButton(saveButtonContainer, saveChangesButton) {
  console.log(saveChangesButton);
  if (saveChangesButton !== null) {
    // Remove the save button
    saveButtonContainer.removeChild(saveChangesButton);
  }
}

export function showSaveButton(saveButtonContainer, saveChangesButton) {
  if (saveChangesButton !== null) {
    // Add the save button to the save button container
    saveButtonContainer.appendChild(saveChangesButton);
  }
  // Show the save button
  saveChangesButton.classList.remove("hidden");
}

export function resetToOriginalState(
  key,
  originalValue,
  card,
  select,
  editIcon,
  cancelIcon,
) {
  // Get the field to reset to the original state
  const fieldToEdit = card.querySelector(`[data-key='${key}']`);

  // Reset the field to the original value
  fieldToEdit.textContent = originalValue;

  // Remove the select element and hide the cancel icon
  select.remove();

  // Hide the cancel icon
  cancelIcon.classList.add("hidden");

  // Show the edit icon
  editIcon.classList.remove("hidden");
}
