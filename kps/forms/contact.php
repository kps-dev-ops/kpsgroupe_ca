<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Test de l'affichage PHP
echo "Test de l'affichage PHP<br>";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

require '../src/assets/vendor/autoload.php';

if (!file_exists(__DIR__ . '/.env')) {
  echo 'Le fichier .env est manquant !';
} else {
  echo 'Le fichier .env est présent.<br>';
}
putenv("TEST_VAR=hello");
echo 'TEST_VAR = ' . getenv('TEST_VAR') . "<br>"; 
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

echo "<pre>";
var_dump($_ENV);  // Affiche toutes les variables d'environnement disponibles
echo "</pre>";

// Vérification de la variable d'environnement
var_dump(getenv('MAIL_USERNAME'));  // Affiche la valeur de la variable d'environnement

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
        $mail->Host = getenv('MAIL_HOST');
        $mail->SMTPAuth = true;
        $mail->Username = getenv('MAIL_USERNAME');
        $mail->Password = getenv('MAIL_PASSWORD');
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = getenv('MAIL_PORT');

        $mail->setFrom(getenv('MAIL_USERNAME'), 'Ubbfy Contact');
        $mail->addAddress('owens.aihunzoun1@gmail.com');
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
