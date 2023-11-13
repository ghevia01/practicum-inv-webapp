<?php

$serverName = "localhost";
$userName = "root";
$password = "";
$dbName = "phpmyadmin";

//connector
$con = mysqli_connect($serverName, $userName, $password, $dbName);

if (mysqli_connect_errno()) {
    echo "Failed Connection!";
    exit();
}
echo "Connection success !";
