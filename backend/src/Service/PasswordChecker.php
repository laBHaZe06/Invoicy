<?php

namespace App\Service;

use Psr\Cache\CacheItemPoolInterface;

class PasswordChecker
{
    private CacheItemPoolInterface $cachePool;

    public function __construct(CacheItemPoolInterface $cachePool)
    {
        $this->cachePool = $cachePool;
    }

    public function isPasswordBanned(string $password): bool
    {
        $cacheItem = $this->cachePool->getItem('banned_passwords');
        if (!$cacheItem->isHit()) {
            // Le cache n'est pas disponible, gérer ce cas selon vos besoins
            // Vous pouvez par exemple utiliser une base de données, un fichier, etc.
            // Voir la documentation de PSR-6 pour plus d'information sur comment utiliser le cache
            return false;
        }

        $bannedPasswords = $cacheItem->get();
        return isset($bannedPasswords[$password]);
    }
}
