<?php

namespace App\Controller;

use App\Dto\User\UserDto;
use App\Entity\User;
use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api')]
class AuthController extends AbstractController
{
    public function __construct(
        private readonly Security $security,
        private readonly UserRepository $userRepository,
    ) {
    }

    #[Route('/login_check', name: 'app_login', methods: ['POST'])]
    public function login(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        JWTTokenManagerInterface $jwtManager,
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$email || !$password) {
            return new JsonResponse(['error' => 'Email and password are required.'], 400);
        }

        $user = $this->userRepository->findOneBy(['email' => $email]);

        if (!$user || !$passwordHasher->isPasswordValid($user, $password)) {
            return new JsonResponse(['error' => 'Invalid credentials.'], 401);
        }

        // Vérification des rôles pour redirection
        if (in_array('ROLE_SUPER_ADMIN', $user->getRoles(), true) || in_array('ROLE_ADMIN', $user->getRoles(), true)) {
            return new JsonResponse(['redirect' => $_ENV['URL_ADMIN']]);
        }

        // Générer le JWT
        $token = $jwtManager->create($user);

        // Création du cookie sécurisé contenant le token JWT
        $cookie = Cookie::create('BEARER')
            ->withValue($token)
            ->withHttpOnly(true)
            ->withSecure('prod' === $_ENV['APP_ENV']) // true en production
            ->withSameSite('Strict')
            ->withPath('/')
            ->withExpires(time() + 3600); // 1h

        $userDto = new UserDto(
            id: $user->getId(),
            firstname: $user->getFirstname(),
            lastname: $user->getLastname(),
            email: $user->getEmail(),
            roles: $user->getRoles(),
            statut: $user->getStatut(),
            siren: $user->getSiren(),
            siret: $user->getSiret(),
            numRcs: $user->getNumRcs(),
            capitalSocial: $user->getCapitalSocial(),
            logo: $user->getLogo(),
            invoices: $user->getInvoices()->toArray(),
            invoicesTemplate: $user->getInvoiceTemplate()->toArray(),
        );
        $response = new JsonResponse([
            'token' => $token,
            'user' => $userDto,
        ]);
        $response->headers->setCookie($cookie);

        return $response;
    }

    #[Route('/profile', name: 'app_profile', methods: ['GET'])]
    public function profile(): JsonResponse
    {
        /** @var User|null $user */
        $user = $this->security->getUser();

        if (!$user) {
            return new JsonResponse(['error' => 'Non authentifié'], 403);
        }

        if (in_array('ROLE_SUPER_ADMIN', $user->getRoles(), true)) {
            return new JsonResponse(['redirect' => $_ENV['URL_ADMIN']]);
        }

        $userDto = new UserDto(
            id: $user->getId(),
            roles: $user->getRoles(),
            firstname: $user->getFirstname(),
            lastname: $user->getLastname(),
            email: $user->getEmail(),
            statut: $user->getStatut(),
            siren: $user->getSiren(),
            siret: $user->getSiret(),
            numRcs: $user->getNumRcs(),
            capitalSocial: $user->getCapitalSocial(),
            logo: $user->getLogo(),
            invoices: $user->getInvoices()->toArray(),
            invoicesTemplate: $user->getInvoiceTemplates()->toArray(),
        );

        return new JsonResponse([
            'user' => $userDto,
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
