<?php

namespace App\Service;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RegistrationService
{
    public function __construct(private UserRepository $userRepository,
        private UserPasswordHasherInterface $encoder,
        private EntityManagerInterface $entityManager,
        private PasswordChecker $passwordChecker,
        private JWTTokenManagerInterface $JWTManager,
        private KernelInterface $kernel)
    {
    }

    public function checkValues($values)
    {
        $values = htmlspecialchars($values);
        $values = trim($values);
        $values = stripslashes($values);

        return $values;
    }

    public function register(string $firstName, string $lastName, string $email, string $password, string $statut, string $siren, string $siret, string $num_rcs, string $capital_social): JsonResponse
    {
        $user = new User();
        $user->setEmail($email);
        $user->setFirstName($this->checkValues($firstName));
        $user->setLastName($this->checkValues($lastName));
        $user->setPassword($this->encoder->hashPassword($user, $password));
        $user->setStatut($this->checkValues($statut));
        $user->setSiren((9 === strlen($siren)) ? $siren : null);
        $user->setSiret(14 === strlen($siret) ? $siret : null);
        $user->setNumRcs(strlen($num_rcs) > 0 ? $num_rcs : null);
        $user->setCapitalSocial(strlen($capital_social) > 0 ? $capital_social : null);
        $user->setCreatedAt(new \DateTimeImmutable());
        $user->setUpdatedAt(new \DateTimeImmutable());

        $user->setVerified(false);
        $user->setRoles(['ROLE_USER']);

        $this->entityManager->persist($user);
        $this->entityManager->flush();
        $id = $user->getId();
        // create a new token for the user with the user id and email
        $token = $this->JWTManager->create($user);

        return new JsonResponse(['success' => 'Registration successful!', 'user_id' => $id, 'email' => $user->getEmail(), 'firstname' => $user->getFirstname(), 'token' => $token], 201);
    }

    public function validateRegistrationData(array $data): ?JsonResponse
    {
        // var_dump($data);
        $emailExist = $this->userRepository->findBy(['email' => $data['email']]);

        if ($emailExist) {
            return new JsonResponse(['error' => 'Email already exist.'], 400);
        } elseif (empty($data['email']) || empty($data['password']) || empty($data['confirmPassword']) || empty($data['firstName']) || empty($data['lastName']) || empty($data['statut'])) {
            return new JsonResponse(['error' => 'All fields are required.'], 400);
        } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return new JsonResponse(['error' => 'Invalid email format.'], 400);
        } elseif ($data['password'] !== $data['confirmPassword']) {
            return new JsonResponse(['error' => 'Passwords do not match.'], 400);
        } elseif (strlen($data['password']) < 12) {
            return new JsonResponse(['error' => 'Password must be at least 12 characters long.'], 400);
        } elseif (!preg_match('/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}/', $data['password'])) {
            return new JsonResponse(['error' => 'Password is not secure.'], 400);
        } elseif (!preg_match('/^[a-zA-Z]{2,}$/', $data['firstName']) || !preg_match('/^[a-zA-Z]{2,}$/', $data['lastName'])) {
            return new JsonResponse(['error' => 'First name and last name must contain only letters.'], 400);
        } elseif (!in_array($data['statut'], ['free-lance', 'EI', 'SARL', 'EURL', 'SASU'])) {
            return new JsonResponse(['error' => 'Invalid statut.'], 400);
        } elseif (!empty($data['siren']) && (!is_numeric($data['siren']) || 9 !== strlen($data['siren']))) {
            return new JsonResponse(['error' => 'Invalid Siren number.'], 400);
        } elseif (!empty($data['siret']) && (!is_numeric($data['siret']) || 14 !== strlen($data['siret']))) {
            return new JsonResponse(['error' => 'Invalid Siret number.'], 400);
        } elseif (!empty($data['num_rcs']) && (!is_numeric($data['num_rcs']))) {
            return new JsonResponse(['error' => 'Invalid num RCS.'], 400);
        } elseif (!empty($data['capital_social']) && (!is_numeric($data['capital_social']))) {
            return new JsonResponse(['error' => 'Invalid capital social.'], 400);
        } elseif (true !== $data['acceptTerms']) {
            return new JsonResponse(['error' => 'You must accept the terms.'], 400);
        } elseif ('Password is not secure' === $this->passwordChecker->isPasswordBanned($data['password'])) {
            return new JsonResponse(['error' => 'Password is not secure.'], 400);
        }

        return null;
    }
}
