// Function to fetch item data from the backend
export const fetchItemData = async (url, itemId) => {
  try {
    // Properly encode the itemId to safely include it in the URL
    const encodedItemId = encodeURIComponent(itemId);

    // Construct the complete URL with the itemId as a query parameter
    const completeUrl = `${url}?itemPtag=${encodedItemId}`;

    console.log(completeUrl); // To be removed in production

    // Send an HTTP GET request to the specified URL and await the response
    const response = await fetch(completeUrl);

    // Get the response status and status text
    const { status, statusText } = response;

    // Check if the response was successful (status code in the range 200-299)
    if (!response.ok) {
      // Fetch additional error information if needed
      const { message = "" } = await response.json();

      // Throw an error with the status and additional info
      throw new Error(
        `Failed to fetch the data. Status: ${status} ${statusText}, Message: ${message}`
      );
    }

    // Get the data from the response, parsed as JSON
    const data = await response.json();

    // Return the fetched data
    return data;
  } catch (error) {
    // If there's an error, log it to the console and throw the error
    console.error("There has been a problem with the fetch operation:", error);
    throw error;
  }
};
