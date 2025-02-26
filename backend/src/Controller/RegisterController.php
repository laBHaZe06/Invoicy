<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Service\JWTService;
use App\Service\RegistrationService;
use App\Service\SendEmailService;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Messenger\SendEmailMessage;
use Symfony\Component\Messenger\MessageBusInterface;

class RegisterController extends AbstractController
{
    public function __construct(
  
    private RegistrationService $rs, 
    private LoggerInterface $logger, 
    private MessageBusInterface $bus, 
    private EntityManagerInterface $em,
    private JWTService $jwt, 
    private SendEmailService $mail,
    private ParameterBagInterface $parameterBag,
    private UserRepository $userRepository,
    private Security $security)
    {
        $this->security = $security;
        $this->rs = $rs;
        $this->bus = $bus;
        $this->em = $em;
        $this->jwt = $jwt;
        $this->mail = $mail;
        $this->logger = $logger;


    }
    #[Route('/api/register', name: 'app_register')]
    public function index(Request $request): JsonResponse
    {
        $data[]= json_decode($request->getContent(), true);
        // var_dump($data);
        // $this->logger->info('User registration request', ['data' => $data]);
        $validationResponse = $this->rs->validateRegistrationData($data[0]);
        if ($validationResponse) {
            return $validationResponse;
        }
        $registerUser = $this->rs->register($data[0]['firstName'], $data[0]['lastName'], $data[0]['email'], $data[0]['password'], $data[0]['statut'], $data[0]['siren'], $data[0]['siret'],$data[0]['num_rcs'],$data[0]['capital_social']);
        $user = json_decode($registerUser->getContent(), true);
        // var_dump($user);
        $header = [
            'alg' => 'HS256',
            'typ' => 'JWT',
        ]; 
        $payload = [
            'id' => $user['user_id'],
            'email' => $user['email'],
            'firstname' => $user['firstname'],
            'time' => time(),
        ];
        
        $token = $this->jwt->generate($header, $payload, $this->parameterBag->get('app.jwtsecret'));

        $this->mail->send(
            'invoicy@contact.com',
            $user['email'],
            'Welcome to our platform Invoicy',
            'register',
            compact('user', 'token')
        );
        // $this->addFlash('success', 'Please check your email to verify your account.');

        // $this->bus->dispatch('New registration ' . $user['email']);

        return $this->json([
            'message' => 'Registration successful! Check your email to verify your account.',
            'user' => $user,
        ], 201);
    }

    #[Route('/api/verif/{token}', name: 'verify_user')]
    public function verifUser(string $token, JWTService $jwt, EntityManagerInterface $em): JsonResponse
    {
        try {
            error_log("🔍 Token reçu : " . $token); // Debug du token
    
            if ($jwt->isValid($token) && !$jwt->isExpired($token) && $jwt->check($token, $this->getParameter('app.jwtsecret'))) {
                error_log("✅ Token valide");
    
                $payload = $jwt->getPayload($token);
                error_log("📩 Payload extrait : " . json_encode($payload));
    
                $user = $this->userRepository->find($payload['id']);
                if ($user) {
                    error_log("👤 Utilisateur trouvé : " . $user->getEmail());
    
                    if (!$user->isVerified()) {
                        $user->setIsVerified(true);
                        $em->flush();
                        error_log("✅ Utilisateur activé");
                        return new JsonResponse(['message' => 'Utilisateur activé'], 200);
                    } else {
                        error_log("⚠️ Utilisateur déjà activé");
                        return new JsonResponse(['message' => 'Utilisateur déjà activé'], 200);
                    }
                } else {
                    error_log("❌ Utilisateur non trouvé !");
                    return new JsonResponse(['message' => 'Utilisateur non trouvé'], 404);
                }
            } else {
                error_log("❌ Token invalide !");
                return new JsonResponse(['message' => 'Token invalide'], 400);
            }
        } catch (\Exception $e) {
            error_log("🚨 Erreur dans la vérification : " . $e->getMessage());
            return new JsonResponse(['message' => 'Erreur : ' . $e->getMessage()], 500);
        }
    }
    
}
