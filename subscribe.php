<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email'] ?? '');
    $errors = [];

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Введите корректный email адрес.";
    }

    if (empty($errors)) {
        $date = date('Y-m-d H:i:s');
        $data = "[$date] Email: $email\n";
        file_put_contents('subscribers.txt', $data, FILE_APPEND | LOCK_EX);
        header("Location: index.php?subscribe=success");
        exit;
    } else {
        $error_message = urlencode(implode(" | ", $errors));
        header("Location: index.php?subscribe=error&msg=$error_message");
        exit;
    }
} else {
    header("Location: index.php");
    exit;
}
?>