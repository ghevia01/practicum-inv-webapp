// Function to fetch data from the server
export const fetchItemData = async (baseUrl, queryKey, queryValue) => {
  try {
    // Construct the full URL with query string
    const url = `${baseUrl}?${encodeURIComponent(
      queryKey
    )}=${encodeURIComponent(queryValue)}`;

    console.log("Fetching data from:", url);

    // Send an HTTP request to the specified URL and await the response
    const response = await fetch(url, { method: "GET" });

    // Check if the response was successful (status code in the range 200-299)
    if (!response.ok) {
      // Fetch additional error information if needed
      const { status, statusText } = response;
      const { error = "Unknown error occurred" } = await response.json();

      // Throw an error with the status and additional info
      throw new Error(
        `Request failed: ${status} ${statusText}, Error: ${error}`
      );
    }

    // Get the data from the response, parsed as JSON
    const fetchedData = await response.json();

    // Return the fetched data
    return fetchedData;
  } catch (error) {
    // If there's an error, log it to the console and throw the error
    console.error("Error in HTTP request:", error);
    throw error;
  }
};

// Function to update data on the server
export const updateItemData = async (baseUrl, updateData) => {
  try {
    // Send an HTTP POST request to the specified URL with the update data
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    // Check if the response was successful (status code in the range 200-299)
    if (!response.ok) {
      // Fetch additional error information if needed
      const { status, statusText } = response;
      const { error = "Unknown error occurred" } = await response.json();

      // Throw an error with the status and additional info
      throw new Error(
        `Request failed: ${status} ${statusText}, Error: ${error}`
      );
    }

    // Get the updated data from the response, parsed as JSON
    const updatedData = await response.json();

    // Check if the update was successful
    if (updatedData.success) {
      console.log("Update successful:", updatedData.message);
    } else {
      throw new Error(updatedData.message || "Update failed.");
    }
  
    // Return the updated data
    return updatedData;
  } catch (error) {
    // If there's an error, log it to the console and throw the error
    console.error("Error in HTTP request:", error);
    throw error;
  }
};
