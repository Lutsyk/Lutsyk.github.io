<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>My Site</title>
        </head>
        <body>
 <?php  

if (isset($_POST['submit'])){     
    $login = $_POST['login'];
    $email = $_POST['email'];
                
    if (empty($login)){
        echo "Введите логин!";
    }
    elseif (empty($email)){
        echo "Введите e-mail!";
    }
   else{
        $resultat = mysql_query("SELECT * FROM clients managers WHERE login = '$login' AND email = '$email'");
        $array = mysql_fetch_array($resultat);
        if (empty($array)){
            echo 'Ошибка! Такого пользователя не существует';
        }
        elseif (mysql_num_rows($resultat) > 0){
        $chars="qazxswedcvfrtgbnhyujmkiolp1234567890QAZXSWEDCVFRTGBNHYUJMKIOLP";
        $max=10; 
        $size=StrLen($chars)-1; 
        $password=null; 
                                               
        while($max--) {
              $password.=$chars[rand(0,$size)]; 
        }
        $newmdPassword = md5($password); 
        $title = 'Востановления пароля пользователю '.$login.' для сайта Site.ru!';
        $letter = 'Вы запросили восстановление пароля для аккаунта '.$login.' на сайте Site.ru \r\nВаш новый пароль: '.$password.'\r\nС уважением админестрация сайта Site.ru';
// Отправляем письмо
        if (mail($email, $title, $letter, "Content-type:text/plain; Charset=windows-1251\r\n")) {
             mysql_query("UPDATE users SET password = '$newmdPassword' WHERE login = '$login'  AND email = '$email'");
        echo 'Новый пароль отправлен на ваш e-mail!<br><a ref="index.php">Главная страница</a>';
         }
      }                              
   }
}
mysql_close();
?>
   </body>
    </html>