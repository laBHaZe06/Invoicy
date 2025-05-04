<?php

namespace App\Security\Authenticator;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;

class LoginAuthenticator extends AbstractAuthenticator
{
    public function __construct(
        private EntityManagerInterface $em,
        private UserPasswordHasherInterface $passwordHasher,
        private JWTTokenManagerInterface $jwtManager,
    ) {
    }

    public function supports(Request $request): ?bool
    {
        return '/api/login_check' === $request->getPathInfo() && $request->isMethod('POST');
    }

    public function authenticate(Request $request): Passport
    {
        $data = json_decode($request->getContent(), true);
        // error_log('AUTH LOGIN REQUEST: ' . json_encode($data));
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        if (!$email || !$password) {
            throw new BadCredentialsException('Email ou mot de passe manquant.');
        }

        return new Passport(
            new UserBadge($email, function ($userIdentifier) {
                return $this->em->getRepository(User::class)->findOneBy(['email' => $userIdentifier]);
            }),
            new PasswordCredentials($password)
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?JsonResponse
    {
        $user = $token->getUser();
        $jwt = $this->jwtManager->create($user);

        $response = new JsonResponse([
            'token' => $jwt,
            'user' => [
                'email' => $user->getUserIdentifier(),
                'roles' => $user->getRoles(),
            ],
        ]);

        $cookie = Cookie::create('BEARER')
        ->withValue($jwt)
        ->withSecure('prod' === $_ENV['APP_ENV'])
        ->withHttpOnly(true)
        ->withPath('/')
        ->withSameSite('Lax');

        $response->headers->setCookie($cookie);

        $this->addCorsHeaders($response, $request);

        return $response;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): JsonResponse
    {
        $response = new JsonResponse([
            'error' => 'Email ou mot de passe incorrect.',
        ], Response::HTTP_UNAUTHORIZED);

        $this->addCorsHeaders($response, $request);

        return $response;
    }

    private function addCorsHeaders(Response $response, Request $request): void
    {
        $origin = $request->headers->get('Origin');
        if ($origin) {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
            $response->headers->set('Access-Control-Allow-Credentials', 'true');
        }
    }
}
