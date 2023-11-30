
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

    // Function to validate query
    function validateQuery($queryKey, $queryValue)
    {
        if ($queryKey === 'Ptag') {
            return isValidPtag($queryValue);
        } elseif ($queryKey === 'Location') {
            return isValidLocation($queryValue);
        } else {
            return false;
        }
    }

    // Function to fetch items from the database
    function fetchItem($dbh, $queryKey, $queryValue)
    {
        // Validate the query
        if (!validateQuery($queryKey, $queryValue)) {
            return null;
        }
        // Construct the SQL statement
        $sql = "SELECT * FROM items WHERE $queryKey = :queryValue";

        // Prepare the SQL statement
        $stmt = $dbh->prepare($sql);
        $stmt->bindParam(':queryValue', $queryValue, PDO::PARAM_STR);

        // Execute SQL statement
        $stmt->execute();

        // Fetch the item from the database
        $item = $stmt->fetch(PDO::FETCH_ASSOC);

        // Return the item
        return $item;
    }

    // If the ptag query parameter is set
    if (isset($_GET['ptag'])) {

        // Fetch the item by ptag
        $item = fetchItem($dbh, 'Ptag', $_GET['ptag']);
        echo $item ? json_encode($item) : json_encode(['error' => 'Item not found']);

        // If the location query parameter is set
    } elseif (isset($_GET['location'])) {

        // Fetch the item by location (implement later)

        // If neither ptag nor location is set, return an error message
    } else {
        echo json_encode(['error' => 'Invalid request']);
    }
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
} finally {
    // Close the database connection
    $dbh = null;
}
