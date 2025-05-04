<?php

namespace App\Security\Authenticator;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class JwtCookieAuthenticator extends AbstractAuthenticator
{
    private JWTTokenManagerInterface $jwtManager;

    public function __construct(JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
    }

    public function supports(Request $request): ?bool
    {
        // Vérifie si le cookie BEARER est présent
        return $request->cookies->has('BEARER');
    }

    public function authenticate(Request $request): Passport
    {
        // Récupérer le token depuis le cookie BEARER
        $token = $request->cookies->get('BEARER');

        if (!$token) {
            throw new AuthenticationException('No JWT token found in cookies.');
        }

        // Décoder le JWT
        $preAuthToken = $this->jwtManager->parse($token);

        if (!$preAuthToken) {
            throw new AuthenticationException('Invalid JWT token.');
        }

        // Extraire le username (email) du JWT
        $username = $preAuthToken['username'] ?? null;

        if (!$username) {
            throw new AuthenticationException('Username not found in JWT.');
        }

        // Créer un passeport d'authentification avec le UserBadge basé sur le username
        return new SelfValidatingPassport(new UserBadge($username));
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        // Si l'authentification réussie, laisser passer la requête sans réponse supplémentaire
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new JsonResponse([
            'message' => strtr($exception->getMessageKey(), $exception->getMessageData()),
        ], Response::HTTP_UNAUTHORIZED);
    }
}
