<?php
$serverName = "localhost";
$username = "root";
$password = "";
$dbName = "test";

// Create a database connection
$connection = mysqli_connect($serverName, $username, $password, $dbName);



if(isset($_POST['username'])){
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM logintable WHERE user = '$username' AND pass = '$password' LIMIT 1";

    $result = mysqli_query($connection, $sql);

    if ($result && mysqli_num_rows($result) == 1) {
        header("Location: ../html/main.html");
    } else {
        echo '<script>alert("Login failed. Please check your username and password.");';
        echo 'window.location.href = "../html/login-interbayamon-fail.html";</script>';
    }
    

    mysqli_close($connection);

}




?>

