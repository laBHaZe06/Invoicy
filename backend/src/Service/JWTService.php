<?php

namespace App\Service;

use DateTimeImmutable;
use Exception;

class JWTService 
{
    /**
     * Génère un JWT.
     *
     * @param array $header
     * @param array $payload
     * @param string $secret
     * @param int $validity Durée de validité en secondes (0 = sans expiration)
     * @return string
     */
    public function generate(array $header, array $payload, string $secret, int $validity = 10800): string
    {
        if ($validity > 0) {
            $now = new DateTimeImmutable();
            $payload['iat'] = $now->getTimestamp();
            $payload['exp'] = $now->getTimestamp() + $validity;
        }

        // Encodage en Base64
        $base64Header = $this->base64UrlEncode(json_encode($header));
        $base64Payload = $this->base64UrlEncode(json_encode($payload));

        // Génération de la signature
        $signature = hash_hmac('sha256', $base64Header . '.' . $base64Payload, $secret, true);
        $base64Signature = $this->base64UrlEncode($signature);

        // Construction du token
        return $base64Header . '.' . $base64Payload . '.' . $base64Signature;
    }

    /**
     * Vérifie si le format du token est valide.
     *
     * @param string $token
     * @return bool
     */
    public function isValid(string $token): bool
    {
        return preg_match('/^[a-zA-Z0-9\-_]+.[a-zA-Z0-9\-_]+.[a-zA-Z0-9\-_]+$/', $token) === 1;
    }

    /**
     * Récupère le payload du token.
     *
     * @param string $token
     * @return array
     */
    public function getPayload(string $token): array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return [];
        }

        return json_decode(base64_decode($this->base64UrlDecode($parts[1])), true) ?? [];
    }

    /**
     * Récupère le header du token.
     *
     * @param string $token
     * @return array
     */
    public function getHeader(string $token): array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return [];
        }

        return json_decode(base64_decode($this->base64UrlDecode($parts[0])), true) ?? [];
    }

    /**
     * Vérifie si le token est expiré.
     *
     * @param string $token
     * @return bool
     */
    public function isExpired(string $token): bool
    {
        $payload = $this->getPayload($token);

        if (!isset($payload['exp'])) {
            return true; // Considérer comme expiré si aucune date d'expiration n'est présente
        }

        return $payload['exp'] < (new DateTimeImmutable())->getTimestamp();
    }

    /**
     * Vérifie la signature du token.
     *
     * @param string $token
     * @param string $secret
     * @return bool
     */
    public function check(string $token, string $secret): bool
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return false;
        }

        [$header, $payload, $signature] = $parts;

        // Recrée la signature à partir des données
        $expectedSignature = hash_hmac('sha256', $header . '.' . $payload, $secret, true);
        $expectedSignature = $this->base64UrlEncode($expectedSignature);

        return hash_equals($expectedSignature, $signature);
    }

    /**
     * Encodage Base64URL (sans padding).
     *
     * @param string $data
     * @return string
     */
    private function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * Décodage Base64URL.
     *
     * @param string $data
     * @return string
     */
    private function base64UrlDecode(string $data): string
    {
        return strtr($data, '-_', '+/');
    }
}
