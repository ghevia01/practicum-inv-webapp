<?php

// Include the database connection file
include 'db_connection.php';

// Set the content-type header to application/json
header('Content-Type: application/json');

// Check if the itemPtag is set in the GET request
if (!isset($_GET['itemPtag'])) {
    echo json_encode(['error' => 'Item Tag is missing']);
    exit;
}

// Get the item Ptag from the GET request
$itemPtag = $_GET['itemPtag'];

// Prepare SQL statement
$stmt = $dbh->prepare('SELECT * FROM items WHERE Ptag = :itemPtag');
$stmt->bindParam('itemPtag', $itemPtag, PDO::PARAM_STR);

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
