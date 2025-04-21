<?php

namespace App\Controller;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route('/api')]
class AuthController extends AbstractController
{
    public function __construct(
        private readonly Security $security
    ) {}

    #[Route('/login', name: 'app_login', methods: ['POST'])]
    public function login(
        #[CurrentUser] ?User $user,
        JWTTokenManagerInterface $jwtManager
    ): JsonResponse {
        
        if (!$user) {
            return new JsonResponse(['error' => 'Invalid credentials.'], 401);
        }

        $token = $jwtManager->create($user);

        $response = new JsonResponse([
            'message' => 'Authenticated successfully',
            'user' => [
                'email' => $user->getEmail(),
                'roles' => $user->getRoles()
            ]
        ]);

        // 🧁 Création du cookie sécurisé contenant le token JWT
        $cookie = Cookie::create('BEARER')
            ->withValue($token)
            ->withHttpOnly(true)
            ->withSecure(false) // passe à true en production (HTTPS)
            ->withSameSite('Strict')
            ->withPath('/')
            ->withExpires(time() + 3600); // 1h de durée

        $response->headers->setCookie($cookie);

        return $response;
    }

    #[Route('/profile', name: 'app_profile', methods: ['GET'])]
    public function profile(): JsonResponse
    {
        $user = $this->security->getUser();

        if (!$user) {
            return $this->json(['error' => 'Non authentifié'], 403);
        }

        return $this->json([
            'user' => [
                'email' => $user->getUserIdentifier(),
                'roles' => $user->getRoles(),
            ],
        ]);
    }

    #[Route('/logout', name: 'app_logout', methods: ['POST', 'GET'])]
    public function logout(): JsonResponse
    {
        $response = new JsonResponse([
            'message' => 'Déconnexion effectuée',
        ]);

        // Supprimer le cookie JWT
        $response->headers->clearCookie('BEARER', '/', null, false, true, 'Strict');

        return $response;
    }
}
