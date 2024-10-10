<?php

namespace App\Tests;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserTest extends KernelTestCase
{
    private UserPasswordHasherInterface $passwordHasher;
    // Pas besoin du constructeur, on récupère le service à partir du conteneur
    protected function setUp(): void
    {
        parent::setUp();

        // Récupérer le service depuis le conteneur
        $this->passwordHasher = self::getContainer()->get(UserPasswordHasherInterface::class);
    }

    public function testUserPasswordHashing()
{

    
    try {
        // Créer un utilisateur avec un mot de passe en clair
        $user = new User();
        $user->setEmail('test@example.com');
        $user->setPassword('password');
        
        // Hashing du mot de passe
        $hashedPassword = $this->passwordHasher->hashPassword($user, $user->getPassword());

        // Vérifier si le mot de passe a bien été hashé
        self::assertNotSame('password', $hashedPassword);

        // Vérifier si le mot de passe est bien stocké en base de données
        // (ici, nous ne testons pas cette partie)

        // Vérifier si le mot de passe est correctement authentifié
        self::assertTrue($this->passwordHasher->isPasswordValid($user, 'password', $hashedPassword));
     
    } catch (\Exception $e) {
        echo $e->getMessage();
    } finally {
        restore_exception_handler();
    }
}

    public function tearDown(): void
    {
        parent::tearDown();
    
        // Désactiver les gestionnaires d'exceptions si nécessaire
        restore_exception_handler();
    }
}