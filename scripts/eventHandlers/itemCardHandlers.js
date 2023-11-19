import { updateInventoryURL } from "../../contants/qrPageContants.js";
import { updateItemData } from "../services/inventoryServices.js";
import { toggleLoadingScreen } from "../modules/qrScannerUI.js";
import { saveButtonContainer } from "../utils/qrPageElements.js";
import { createButton, createConfirmationModal } from "../utils/domUtils.js";

import {
  showEditState,
  resetToOriginalState,
  removeSaveButton,
  showSaveButton,
} from "../modules/qrScannerUI.js";

let cancelClickListener;

export function handleEditClick(event, itemData, key, select) {
  // Get the card element
  const card = event.currentTarget.closest(".result-card");
  const originalValue = itemData[key];
  const editIcon = event.currentTarget;
  const cancelIcon = editIcon.nextElementSibling;

  // Show the edit state
  showEditState(key, card, select, editIcon, cancelIcon);

  // Get the save changes button
  let saveChangesButton = saveButtonContainer.querySelector(
    ".save-changes-button"
  );

  // Remove the cancel click listener if it exists
  if (cancelClickListener) {
    cancelIcon.removeEventListener("click", cancelClickListener);
  }

  // Create the cancel click listener
  cancelClickListener = function () {
    removeSaveButton(saveButtonContainer, saveChangesButton);
    resetToOriginalState(
      key,
      originalValue,
      card,
      select,
      editIcon,
      cancelIcon
    );
  };

  // Add the event listener to the cancel icon
  cancelIcon.addEventListener("click", cancelClickListener, { once: true });

  if (!saveChangesButton) {
    // Create the save changes button and add the event listener
    saveChangesButton = createButton("Save Changes", "save-changes-button");
    saveChangesButton.addEventListener("click", function () {
      const newValue = select.value;

      // Show the confirmation modal
      createConfirmationModal(
        function () {
          handleSaveClick(
            itemData,
            key,
            newValue,
            card,
            select,
            editIcon,
            cancelIcon,
            saveChangesButton
          );
        },
        function () {
          // Reset the card to the original state
          removeSaveButton(saveButtonContainer, saveChangesButton);
          resetToOriginalState(
            key,
            originalValue,
            card,
            select,
            editIcon,
            cancelIcon
          );
        }
      );
    });

    // Append the save button to the save button container and show it
    showSaveButton(saveButtonContainer, saveChangesButton);
  }
}

export function handleSaveClick(
  itemData,
  key,
  newValue,
  card,
  select,
  editIcon,
  cancelIcon,
  saveChangesButton
) {
  // Data to send to the server
  const updateData = {
    Ptag: itemData.Ptag,
    [key]: newValue,
  };

  // Show the loading screen
  toggleLoadingScreen(true);

  // Send the data to the server
  updateItemData(updateInventoryURL, updateData)
    .then((response) => {
      if (response.success) {
        // Replace the field text with the new value and update the item data
        card.querySelector(`[data-key='${key}']`).textContent = newValue;
        itemData[key] = newValue;
      } else {
        throw new Error(response.error || "Failed to update item");
      }
    })
    .catch((error) => {
      // Show the error message and reset the card to the original state
      console.error("Update failed:", error);
      resetToOriginalState(
        key,
        itemData[key],
        card,
        select,
        editIcon,
        cancelIcon
      );
    })
    .finally(() => {
      removeSaveButton(saveButtonContainer, saveChangesButton);
      resetToOriginalState(
        key,
        newValue,
        card,
        select,
        editIcon,
        cancelIcon
      );
      // Hide the loading screen
      toggleLoadingScreen(false);
    });
}
