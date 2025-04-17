<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Service\RegistrationService;
use App\Service\SendEmailService;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;


#[Route(path: '/api')]
class RegisterController extends AbstractController
{
    public function __construct(

    private RegistrationService $rs, 
    private LoggerInterface $logger, 
    private MessageBusInterface $bus, 
    private EntityManagerInterface $em,
    private SendEmailService $mail,
    private ParameterBagInterface $parameterBag,
    private UserRepository $userRepository,
    private Security $security)
    {
        $this->security = $security;
        $this->rs = $rs;
        $this->bus = $bus;
        $this->em = $em;
        $this->mail = $mail;
        $this->logger = $logger;


    }
    #[Route('/register', name: 'app_register', methods: ['POST'])]
    public function index(Request $request, JWTTokenManagerInterface $JWTManager): JsonResponse
    {
        $userInfo[]= json_decode($request->getContent(), true);
        // var_dump($data);
        // $this->logger->info('User registration request', ['data' => $data]);
        $validationResponse = $this->rs->validateRegistrationData($userInfo[0]);
        if ($validationResponse) {
            return $validationResponse;
        }
        $registerUser = $this->rs->register($userInfo[0]['firstName'], $userInfo[0]['lastName'], $userInfo[0]['email'], $userInfo[0]['password'], $userInfo[0]['statut'], $userInfo[0]['siren'], $userInfo[0]['siret'],$userInfo[0]['num_rcs'],$userInfo[0]['capital_social']);
        $data = json_decode($registerUser->getContent(), true);
        $token = $data['token'];
        $expirationToken = time() + 3600;
        $this->mail->send(
            'invoicy@contact.com',
            $data['email'],
            'Welcome to our platform Invoicy',
            'register',
            compact('data', 'token', 'expirationToken')
        );
        $this->logger->info('User registered successfully', ['data' => $data]);
        
        return new JsonResponse([
            'data' => $data,
        ], 201);
    }
    
    #[Route('/verif/{token}', name: 'verify_user')]
    public function verifUser(string $token, EntityManagerInterface $em, JWTEncoderInterface $jwtEncoder): JsonResponse
    {
        if (!$token) {
            return $this->json(['message' => 'Token manquant'], Response::HTTP_BAD_REQUEST, [
                'Access-Control-Allow-Origin' => '*'
            ]);
            
        }
        
        try {
            $decodedToken = $jwtEncoder->decode($token);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Token invalide', 'error' => $e->getMessage()], Response::HTTP_BAD_REQUEST, [
                'Access-Control-Allow-Origin' => '*'
            ]);
        }
        
        $user = $this->userRepository->findOneBy(['email' => $decodedToken['username']]);
        
        if (!$user) {
            return $this->json(['message' => 'Utilisateur non trouvé'], Response::HTTP_NOT_FOUND, [
                'Access-Control-Allow-Origin' => '*'
            ]);
        }
        
        $user->setVerified(true);
        $em->flush();
        
        return $this->json(['message' => 'Utilisateur vérifié'], Response::HTTP_OK, [
            'Access-Control-Allow-Origin' => '*',
            
            
        ]);
    }
    
    #[Route('/resend', name: 'resend_verification_email', methods: ['POST'])]
    public function resend(Request $request, JWTTokenManagerInterface $JWTManager, SendEmailService $email_service): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? null;

        if (!$email) {
            return $this->json(['message' => 'Email manquant'], Response::HTTP_BAD_REQUEST, [
                'Access-Control-Allow-Origin' => '*'
            ]);
        }

        $user = $this->userRepository->findOneBy(['email' => $email]);

        if (!$user) {
            return $this->json(['message' => 'Utilisateur non trouvé'], Response::HTTP_NOT_FOUND, [
                'Access-Control-Allow-Origin' => '*'
            ]);
        }

        if ($user->isVerified()) {
            return $this->json(['message' => 'Utilisateur déjà vérifié'], Response::HTTP_BAD_REQUEST, [
                'Access-Control-Allow-Origin' => '*'
            ]);
        }

        $token = $JWTManager->create($user);
        $expirationToken = time() + 3600;

        $email_service->send(
            'invoicy@contact.com',
            $user->getEmail(),
            'Resend Activation Email',
            'resend_verification',
            compact('user', 'token', 'expirationToken')
        );

        $this->logger->info('Verification email resent', ['email' => $email]);

        return $this->json(['message' => 'Email de vérification renvoyé'], Response::HTTP_OK, [
            'Access-Control-Allow-Origin' => '*'
        ]);
    }

}
    
