<!-- Author: Gean Hevia -->

<?php

// Database connection (Data Source Name)
$dsn = 'mysql:host=localhost;dbname=inventory_webapp_test;charset=utf8';

// Database credentials
$username = 'root';
$password = '';

// PDO connection
try {
    // Create new PDO (PHP Data Objects) instance, (create a connection to the database)
    $dbh = new PDO($dsn, $username, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
