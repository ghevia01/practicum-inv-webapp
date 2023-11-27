<?php

session_start();

include 'db-connection.php';

if (isset($_POST["loginBtn"])) {
    if (isset($_POST["username"], $_POST["password"])) {
        $username = trim($_POST["username"]);
        $password = trim($_POST["password"]);

        $sql = "SELECT * FROM users WHERE username = :username";
        $stmt = $dbh->prepare($sql);
        $params = ['username' => $username];
        $stmt->execute($params);
        if ($stmt->rowCount() > 0) {
            $getRow = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($password, $getRow['password'])) {
                unset($getRow['password']);
                $_SESSION = $getRow;
                header('location: ../html/index.html');
                exit();
            } else {
                $_SESSION['login_error'] = 'Username or Password incorrect.';
                header('Location: ../html/login.html');
                exit();
            }
        } else {
            $_SESSION['login_error'] = 'Username or Password incorrect.';
            header('Location: ../html/login.html');
            exit();
        }
    }
}

if (isset($_GET['get_error_message'])) {
    $errorMessage = isset($_SESSION['login_error']) ? $_SESSION['login_error'] : '';
    unset($_SESSION['login_error']);
    echo $errorMessage;
    exit();
}
