<?php

namespace App\Factory;

use App\Entity\User;

class UserFactory
{
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
        ?string $logo = null
    ): User {
        $user = new User();
        $now = new \DateTimeImmutable();

        $user->setEmail($email)
             ->setPassword($password)
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
}