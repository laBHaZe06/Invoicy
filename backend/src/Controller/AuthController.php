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

    #login_check is the route name for the login check and get token by api platform
    #[Route(path: '/login_check', name: 'app_login', methods: ['POST'])]
    public function login(AuthenticationUtils $authenticationUtils): JsonResponse
    {
        $error = $authenticationUtils->getLastAuthenticationError();
        if ($error) {
            return $this->json([
                'error' => $error->getMessage(),
            ], 401);
        }

        /** @var UserInterface $user */
        $user = $this->security->getUser();
        
        if (!$user) {
            return $this->json([
                'error' => 'Utilisateur non trouvé',
            ], 401);
        } 
        
        
        return $this->json([
            'token' => $user->getToken(),
        ]);

    }



    #[Route(path: '/profile', name: 'app_profile', methods: ['GET'])]
    public function profile(Request $request): JsonResponse
    {

    /** @var UserInterface $user */
    $user = $this->security->getUser();

    if(!$user) {
        $this->json([
            'error' => 'Utilisateur non autorisé',
        ], 403);
    }

    // $displayName = $user->getDisplayName(); 
    $firstName = $user->getFirstName(); 
    $lastName = $user->getLastName(); 

    $token = $request->getContent('token');

    return $this->json([
        'user' => [
            'identifier' => $user->getUserIdentifier(),
            // 'display_name' => $displayName,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'token' => $token,
        ],
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
