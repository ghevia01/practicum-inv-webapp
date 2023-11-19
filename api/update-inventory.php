<?php

// Include the database connection file
include 'db-connection.php';

// Set the content-type header to application/json
header('Content-Type: application/json');

try {

    // Function to validate ptag
    function isValidPtag($ptag)
    {
        return preg_match('/^Y00\d{6}$/', $ptag);
    }

    // Function to validate location
    function isValidLocation($location)
    {
        return preg_match('/^[A-G]-\d{3}$/', $location);
    }

    // Function to update item in the database
    function updateItem($dbh, $ptag, $location)
    {
        // Validate the ptag and location
        if (!isValidPtag($ptag) || !isValidLocation($location)) {
            return null;
        }

        // Construct the SQL statement
        $sql = "UPDATE items SET Location = :location WHERE Ptag = :ptag";

        // Prepare the SQL statement
        $stmt = $dbh->prepare($sql);
        $stmt->bindParam(':ptag', $ptag, PDO::PARAM_STR);
        $stmt->bindParam(':location', $location, PDO::PARAM_STR);

        // Execute SQL statement
        $stmt->execute();

        // Check if the update was successful
        if ($stmt->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    }

    // Fetch and decode the JSON from POST body
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);

    if (isset($input['Ptag']) && isset($input['Location'])) {
        // Update the item
        $updatedItem = updateItem($dbh, $input['Ptag'], $input['Location']);

        echo $updatedItem ? json_encode(['success' => true]) : json_encode(['error' => 'Item could not be updated']);
    } else {
        echo json_encode(['error' => 'Invalid input']);
    }
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
} finally {
    // Close the database connection
    $dbh = null;
}
