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
            // If the cache item is not hit, it means the banned passwords are not loaded
            return false;
        }

        $bannedPasswords = $cacheItem->get();

        return isset($bannedPasswords[$password]);
    }
}
