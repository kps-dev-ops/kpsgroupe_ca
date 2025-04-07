<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../src/assets/vendor/autoload.php';


$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? 'Anonyme';
    $email = $_POST['email'] ?? 'no-reply@ubbfy.com';
    $subject = $_POST['subject'] ?? 'Aucun sujet';
    $message = $_POST['message'] ?? 'Pas de message';

    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo json_encode(["status" => "error", "message" => "Tous les champs sont obligatoires."]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = $_ENV['MAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV['MAIL_USERNAME'];
        $mail->Password = $_ENV['MAIL_PASSWORD'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = $_ENV['MAIL_PORT'];

        $mail->setFrom($_ENV['MAIL_USERNAME'], 'Ubbfy Contact');
        $mail->addAddress($_ENV['MAIL_SENDER']);
        $mail->addReplyTo($email, $name);

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = "
            <h3>Nouveau message de contact</h3>
            <p><strong>Nom :</strong> $name</p>
            <p><strong>Email :</strong> $email</p>
            <p><strong>Sujet :</strong> $subject</p>
            <p><strong>Message :</strong><br>$message</p>
        ";
        $mail->AltBody = "Nom: $name\nEmail: $email\nSujet: $subject\nMessage:\n$message";

        $mail->send();
        echo json_encode(["status" => "success", "message" => "E-mail envoyé avec succès !"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Erreur d'envoi : " . $mail->ErrorInfo]);
        exit;
    }
}
?>
