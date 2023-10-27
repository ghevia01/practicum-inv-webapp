async function fetchItemData(url, itemId) {
  try {
    // Send an HTTP POST request to the specified URL and await the response.
    const response = await fetch(`${url}?itemId=${itemId}`)

    // Check if the response was successful (status code in the range 200-299)
    if (!response.ok) {
      throw new Error(
        `Failed to fetch the data. Status: ${response.status} ${response.statusText}`
      );
    }

    // Get the data from the response, parsed as JSON
    const data = await response.json();

    // Return the data
    return data;
  } catch (error) {
    // If there's an error, log it to the console and throw the error
    console.error("There has been a problem with the fetch operation:", error);
    throw error;
  }
}

export { fetchItemData };
