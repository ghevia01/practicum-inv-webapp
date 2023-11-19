// Function to create button element
export function createButton(text, className) {
  const button = document.createElement("button");
  button.textContent = text;
  button.className = className;
  return button;
}

// Function to create an edit icon
export function createEditIcon(key) {
  const editIcon = document.createElement("i");
  editIcon.className = "material-icons-outlined edit-icon";
  editIcon.setAttribute("data-key", key);
  editIcon.textContent = "edit";
  return editIcon;
}

// Function to create a cancel icon
export function createCancelIcon(key) {
  const cancelIcon = document.createElement("i");
  cancelIcon.className = "material-icons-outlined cancel-icon hidden";
  cancelIcon.setAttribute("data-key", key);
  cancelIcon.textContent = "cancel";
  return cancelIcon;
}

export function createSelect(locationOptions, itemData, key) {
  const select = document.createElement("select");
  select.className = "edit-select hidden";
  locationOptions.forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.text = optionValue;
    if (itemData[key] === optionValue) {
      option.text += " (current location)";
      option.disabled = true;
    }
    select.appendChild(option);
  });
  return select;
}

export function createConfirmationModal(confirmCallback, cancelCallback) {
  // Create the modal container
  const modalContainer = document.createElement("div");
  modalContainer.id = "confirmationModal";
  modalContainer.className = "modal hidden";

  // Create the modal content area
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  // Add text to the modal
  const modalText = document.createElement("p");
  modalText.textContent = "Are you sure you want to change the location?";

  // Create the buttons container
  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons-container";

  // Create the confirm button
  const confirmButton = document.createElement("button");
  confirmButton.className = "confirm-button";
  confirmButton.textContent = "Confirm";
  confirmButton.addEventListener("click", function () {
    confirmCallback();
    closeModal(modalContainer);
  });

  // Create the cancel button
  const cancelButton = document.createElement("button");
  cancelButton.className = "cancel-button";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", function () {
    cancelCallback();
    closeModal(modalContainer);
  });

  // Append elements to modalContent
  modalContent.appendChild(modalText);
  buttonsContainer.appendChild(confirmButton);
  buttonsContainer.appendChild(cancelButton);
  modalContent.appendChild(buttonsContainer);

  // Append modalContent to modalContainer
  modalContainer.appendChild(modalContent);

  // Append modalContainer to body
  document.body.appendChild(modalContainer);

  // Function to show the modal
  function showModal() {
    modalContainer.classList.remove("hidden");
  }

  // Function to close the modal
  function closeModal() {
    modalContainer.classList.add("hidden");
    modalContainer.remove();
  }

  // Immediately show the modal
  showModal();

  // Return the modal container
  return modalContainer;
}
