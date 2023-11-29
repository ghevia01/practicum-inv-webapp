<?php
include 'db-connection.php';

// Page parameters
$page = isset($_GET['page']) ? $_GET['page'] : 1;
$recordsPerPage = 10; // Adjust this according to your needs

$offset = ($page - 1) * $recordsPerPage;

// Fetch total records
$totalRecords = getTotalRecords();


$sql = "SELECT * FROM users ORDER BY id ASC LIMIT :offset, :limit";
$stmt = $dbh->prepare($sql);
$stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
$stmt->bindParam(':limit', $recordsPerPage, PDO::PARAM_INT);
$stmt->execute();

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

$settingsIcon = '<span class="material-icons-outlined">settings</span>';

// Echo table contents based on query
foreach ($data as $user) {
    echo    "<tr>
                <td>{$user['id']}</td>
                <td>{$user['name']}</td>
                <td>{$user['username']}</td>
                <td>{$user['email']}</td>
                <td>{$user['phone']}</td>
                <td>{$user['role']}</td>
                <td id='edit' onclick=\"openpopedit('{$user['id']}', '{$user['name']}', '{$user['username']}', '{$user['email']}', '{$user['phone']}', '{$user['role']}')\">$settingsIcon</td>
            </tr>";
}

$remainingRows = $recordsPerPage - count($data);
for ($i = 0; $i < $remainingRows; $i++) {
    echo "<tr>";
    for ($j = 0; $j < 7; $j++) { // 7 columns in users table
        echo "<td>&nbsp;</td>";
    }
    echo "</tr>";
}

// Fetch total records
function getTotalRecords() {
    include 'db-connection.php';

    $sql = "SELECT COUNT(*) as totalRecords FROM users";
    $stmt = $dbh->prepare($sql);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);


    echo "totalPages=" . ceil($result['totalRecords'] / $GLOBALS['recordsPerPage']);

    return $result['totalRecords'];
}
?>
