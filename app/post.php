<?php

// email address
// $to = 'info@click-service.me'; //вставить свой имейл 
$to = 'spheric.zoo@gmail.com'; //вставить свой имейл 

$subject = 'Click-Service.me';
$name = htmlspecialchars($_POST['feedback-name']);
$phone = htmlspecialchars($_POST['feedback-phone']);
$email = htmlspecialchars($_POST['feedback-email']);

$message = "Имя: $name<br>\r\n";
$message .= "Телефон: $phone<br>\r\n";
if ($email) {
  $message .= "E-mail: $email<br>\r\n";
}

$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
$headers .= "X-Priority: 1\r\n";


$sentMail = mail($to, $subject, $message, $headers);
if($sentMail) //output success or failure messages
{ 
  echo 'done';
}else{
  echo 'error';
}
