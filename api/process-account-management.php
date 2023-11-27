<?php

include 'db-connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['id'])) {
        $id = $_POST["id"];
    }
    $name = $_POST["name"];
    $username = $_POST["username"];
    if (isset($_POST['password'])) {
        $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
    }
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $role = $_POST['role'];

    if (isset($_POST['btnAdd'])) {
        $sql = "INSERT INTO users (name, username, password, email, phone, role) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $dbh->prepare($sql);
        $stmt->execute([$name, $username, $password, $email, $phone, $role]);
    } elseif (isset($_POST['btnEdit'])) {
        $sql = "UPDATE users SET name=?, username=?, email=?, phone=?, role=? WHERE id=?";
        $stmt = $dbh->prepare($sql);
        $stmt->execute([$name, $username, $email, $phone, $role, $id]);
    }

    // Get the referrer from the URL parameters
    $referrer = isset($_GET['referrer']) ? $_GET['referrer'] : '../html/account-management.html';

    header("Location: $referrer");
    exit();
}
?>
