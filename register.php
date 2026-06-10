<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';
    $agree = isset($_POST['agree']);

    $errors = [];

    if (empty($username) || strlen($username) < 3) {
        $errors[] = "Имя пользователя должно быть не менее 3 символов.";
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Введите корректный email адрес.";
    }
    if (strlen($password) < 6) {
        $errors[] = "Пароль должен быть не менее 6 символов.";
    }
    if ($password !== $confirm_password) {
        $errors[] = "Пароли не совпадают.";
    }
    if (!$agree) {
        $errors[] = "Вы должны согласиться с условиями.";
    }

    if (empty($errors)) {
        $date = date('Y-m-d H:i:s');
        $data = "[$date] Username: $username | Email: $email | Password: $password\n";
        file_put_contents('users.txt', $data, FILE_APPEND | LOCK_EX);
        header("Location: index.php?status=success");
        exit;
    } else {
        $error_message = urlencode(implode(" | ", $errors));
        header("Location: index.php?status=error&msg=$error_message");
        exit;
    }
} else {
    header("Location: index.php");
    exit;
}
?>