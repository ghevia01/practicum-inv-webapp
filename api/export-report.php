<?php

include 'db-connection.php';

$location = isset($_GET['location']) ? $_GET['location'] : null;
$encodedLocation = urlencode($location);

header('Content-Type: text/csv');

if ($location === 'all') {
    header('Content-Disposition: attachment; filename="devices_report_all.csv"');

    $sql = "SELECT PTag, Description, Location FROM items";
} else {
    header('Content-Disposition: attachment; filename="devices_report_' . $encodedLocation . '.csv"');

    $sql = "SELECT PTag, Description, Location FROM items WHERE Location = :location";
}

$output = fopen('php://output', 'w');

// Names of columns to display in exported file
fputcsv($output, array('Device ID', 'Device Namme', 'Location'));

// Query based on columns to display

$stmt = $dbh->prepare($sql);

if ($location !== 'all') {
    $stmt->bindParam(':location', $location, PDO::PARAM_STR);
}

$stmt->execute();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    fputcsv($output, $row);
}

fclose($output);

$dbh = null;

?>