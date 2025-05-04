<?php

namespace App\Factory;

use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFactory
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function create(
        string $email,
        string $password,
        string $firstname,
        string $lastname,
        string $statut,
        ?string $siren = null,
        ?string $siret = null,
        ?string $numRcs = null,
        ?string $capitalSocial = null,
        ?string $logo = null,
    ): User {
        $user = new User();
        $now = new \DateTimeImmutable();
        $hashedPassword = $this->passwordHasher->hashPassword($user, $password);
        $user->setEmail($email)
             ->setPassword($hashedPassword)
             ->setFirstname($firstname)
             ->setLastname($lastname)
             ->setStatut($statut)
             ->setSiren($siren)
             ->setSiret($siret)
             ->setNumRcs($numRcs)
             ->setCapitalSocial($capitalSocial)
             ->setLogo($logo)
             ->setRoles(['ROLE_USER'])
             ->setVerified(false)
             ->setCreatedAt($now)
             ->setUpdatedAt($now);

        return $user;
    }

    public function update(
        User $user,
        ?string $email = null,
        ?string $firstname = null,
        ?string $lastname = null,
        ?string $statut = null,
        ?string $siren = null,
        ?string $siret = null,
        ?string $numRcs = null,
        ?string $capitalSocial = null,
        ?string $logo = null,
        string $newPassword = '',
    ): User {
        $hashedPassword = $this->passwordHasher->hashPassword($user, $newPassword);

        if ($email) {
            $user->setEmail($email);
        }
        if ($firstname) {
            $user->setFirstname($firstname);
        }
        if ($lastname) {
            $user->setLastname($lastname);
        }
        if ($statut) {
            $user->setStatut($statut);
        }
        if ($siren) {
            $user->setSiren($siren);
        }
        if ($siret) {
            $user->setSiret($siret);
        }
        if ($numRcs) {
            $user->setNumRcs($numRcs);
        }
        if ($capitalSocial) {
            $user->setCapitalSocial($capitalSocial);
        }
        if ($logo) {
            $user->setLogo($logo);
        }
        if ($newPassword) {
            $user->setPassword($hashedPassword);
        }
        $user->setUpdatedAt(new \DateTimeImmutable());

        return $user;
    }

    public function updatePassword(
        User $user,
        string $newPassword,
    ): User {
        $user->setPassword($newPassword);

        return $user;
    }
}
