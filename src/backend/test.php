<?php
    header("Content-Type: application/json");
    $username = $_POST['username'];
    $password = $_POST['password'];

    echo "your data is".$username." | ".$password;
?>