// Author: Gean Hevia

import { handleEditClick } from "../eventHandlers/itemCardHandlers.js";
import { createEditIcon, createCancelIcon, createSelect } from "./domUtils.js";
import { keysToShow, locationOptions } from "../../contants/qrPageContants.js";

export const createItemCard = (fetchedItemData) => {
  // Create the card element
  const card = document.createElement("div");
  card.className = "result-card";

  // Create the card header element and its title
  const cardHeader = document.createElement("div");
  cardHeader.className = "result-title";
  const cardHeaderTitle = document.createElement("h2");
  cardHeaderTitle.textContent = "Scan Results";
  cardHeader.appendChild(cardHeaderTitle);
  card.appendChild(cardHeader);

  // Create the list to display the data
  const cardBodyList = document.createElement("dl");
  card.appendChild(cardBodyList);

  // Iterate over each key to display its value
  keysToShow.forEach((key) => {
    // Create the key element (field name)
    const dt = document.createElement("dt");
    dt.textContent = key.replace(/_/g, " ");

    // Create the value element (field value)
    const dd = document.createElement("dd");
    dd.setAttribute("data-key", key);
    dd.textContent = fetchedItemData[key] !== undefined ? fetchedItemData[key] : "N/A";

    if (key === "Location") {

      // Create a copy of fetchedItemData for this card
      const itemData = { ...fetchedItemData };

      // Create a container for dd and the edit icon
      const ddContainer = document.createElement("div");
      ddContainer.className = "dd-container";

      // Create and populate the select element
      const select = createSelect(locationOptions, itemData, key);

      // Create cancel icon
      const cancelIcon = createCancelIcon(key);

      console.log("Select element:", select);

      // Create edit icon and add event listener
      const editIcon = createEditIcon(key);
      editIcon.addEventListener("click", (event) =>
        handleEditClick(event, itemData, key, select)
      );

      // Append dd element to the container
      ddContainer.appendChild(dd);

      // Append editIcon icon and cancel icon
      ddContainer.appendChild(editIcon);
      ddContainer.appendChild(cancelIcon);

      // Append container to the list
      cardBodyList.appendChild(dt);
      cardBodyList.appendChild(ddContainer);
    } else {
      // Append key and value to list
      cardBodyList.appendChild(dt);
      cardBodyList.appendChild(dd);
    }
  });

  return card;
};
