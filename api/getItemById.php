<?php

// Include the database connection file
include 'db_connection.php';

// Set the content-type header to application/json
header('Content-Type: application/json');

// Check if the itemId is set in the GET request
if (isset($_GET['itemId'])) {
    // Get the item ID
    $itemId = $_GET['itemId'];

    // Prepare SQL statement
    $stmt = $dbh->prepare('SELECT * FROM items WHERE Ptag = :itemId');
    $stmt->bindParam('itemId', $itemId, PDO::PARAM_STR);

    // Execute SQL statement
    $stmt->execute();

    // Fetch the item from the database
    $item = $stmt->fetch(PDO::FETCH_ASSOC);

    // Close the database connection
    $dbh = null;

    if ($item) {
        // If the item exists, return it
        echo json_encode($item);
    } else {
        // If the item does not exist, return an error message
        echo json_encode(['error' => 'Item not found']);
    }
} else {
    // If itemId is not set in the request, return an error message
    echo json_encode(['error' => 'Item ID is missing']);
}
