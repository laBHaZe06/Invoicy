<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

#[Route(path: '/api')]
class AuthController extends AbstractController
{ public function __construct(private Security $security)
    {
        $this->security = $security;
    }

    #[Route(path: '/login_check', name: 'app_login', methods: ['POST'])]
    public function login(AuthenticationUtils $authenticationUtils, Request $request): JsonResponse
    {
        
        $error = $authenticationUtils->getLastAuthenticationError();
        $isAuth = $this->security->getUser() !== null;
        
        $cookie = $request->cookies->get('token');
        
    
        return new JsonResponse([
            'isAuthenticated' => $isAuth,
            'error' => $error,
            'token' => $cookie,
        ]);

    }


    #[Route(path: '/profile', name: 'app_profile', methods: ['GET'])]
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
            'token' => $this->security->getToken() ? $this->security->getToken()->getUserIdentifier() : null,
        ]);
    }


    #[Route(path: '/logout', name: 'app_logout', methods: ['POST', 'GET'])]
    public function logout(): void
    {
        $cookie = new Cookie('user_token', null, time() - 3600, '/', null, false, true);
        $response = new JsonResponse([
            'token' => null,
        ]);
        $response->headers->setCookie($cookie);
        $response->send();
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
