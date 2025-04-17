<?php

namespace App\Cache;

use Psr\Cache\CacheItemPoolInterface;
use Symfony\Component\HttpKernel\CacheWarmer\CacheWarmerInterface;

class BannedPasswordsWarmer implements CacheWarmerInterface
{
    private CacheItemPoolInterface $cachePool;
    private string $projectDir;

    public function __construct(CacheItemPoolInterface $cachePool, string $projectDir)
    {
        $this->cachePool = $cachePool;
        $this->projectDir = $projectDir;
    }

    public function isOptional(): bool
    {
        return $_ENV['APP_ENV'] === 'test' || $_ENV['APP_ENV'] === 'ci';
    }

    public function warmUp(string $cacheDir, ?string $buildDir = null): array
    {
        $this->deleteCacheItem('banned_passwords');
        $filePath = $this->projectDir . '/wordList/rockyou.txt';
        if (!file_exists($filePath) || getenv('SKIP_PASSWORD_WARMER') === '1') {
            return [];
        }
        $bannedPasswords = [];
        if ($handle = fopen($filePath, 'r')) {
            while (($line = fgets($handle)) !== false) {
                $bannedPasswords[] = trim($line);
            }
            
            fclose($handle);
        } else {
            throw new \RuntimeException('Impossible d\'ouvrir le fichier rockyou.txt.');
        }

        $cacheItem = $this->cachePool->getItem('banned_passwords');
        $cacheItem->set($bannedPasswords);
        $this->cachePool->save($cacheItem);

        return [];
    }


    //delete cache before warming up
    public function deleteCacheItem($key): bool
    {
        return $this->cachePool->deleteItem($key);
    }

}
