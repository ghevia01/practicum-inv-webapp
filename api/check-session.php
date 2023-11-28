<?php

function checkLogin()
{
    session_start();
    return isset($_SESSION['username']);
}

if (!checkLogin()) {
    http_response_code(401);
    exit();
}
