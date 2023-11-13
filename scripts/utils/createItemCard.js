export const createItemCard = (itemData) => {
  // Define keys to show in the card
  const keysToShow = [
    "Ptag",
    "Description",
    "Model",
    "Serial_No",
    "Location",
    "Status",
    "Comments",
  ];

  // Create elements
  const card = document.createElement("div");
  const cardHeader = document.createElement("div");
  const cardHeaderTitle = document.createElement("h2");
  const cardBodyList = document.createElement("dl");

  // Assign classes to elements
  card.className = "result-card";
  cardHeader.className = "result-title";
  cardHeaderTitle.textContent = "Scan Results";

  // Append elements to cardHeader
  cardHeader.appendChild(cardHeaderTitle);

  // Append card header to card
  card.appendChild(cardHeader);

  // Create and append elements to cardBodyList
  keysToShow.forEach((key) => {
    if (itemData[key]) {
      const dt = document.createElement("dt");
      dt.textContent = key.replace(/_/g, " ");
      const dd = document.createElement("dd");

      dt.textContent = key;
      dd.textContent = itemData[key] !== undefined ? itemData[key] : "N/A";

      cardBodyList.appendChild(dt);
      cardBodyList.appendChild(dd);
    }
  });

  // Append elements to card
  card.appendChild(cardBodyList);

  return card;
};
