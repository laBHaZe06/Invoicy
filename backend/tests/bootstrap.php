<?php

use Symfony\Component\Dotenv\Dotenv;

require dirname(__DIR__).'/vendor/autoload.php';

if (file_exists(dirname(__DIR__).'/config/bootstrap.php')) {
    require dirname(__DIR__).'/config/bootstrap.php';
} elseif (method_exists(Dotenv::class, 'bootEnv')) {
    (new Dotenv())->bootEnv(dirname(__DIR__).'/.env');
}

// Charger les variables d'environnement à partir du fichier .env si non déjà chargé
if (!getenv('APP_ENV')) {
    putenv('APP_ENV=test');
}

// Charger le fichier .env si ce n'est pas déjà fait (assurez-vous que ce fichier existe dans votre projet)
(new Dotenv())->load(__DIR__.'/../.env');

// S'assurer que l'environnement "test" est bien défini
if ('test' !== getenv('APP_ENV')) {
    putenv('APP_ENV=test');
}
