<?php

namespace App\Factory;

use App\Entity\Clients;

class ClientFactory
{
    public function create(
        string $firstname,
        string $lastname,
        string $companyName,
        string $email,
        string $phone
    ): Clients {
        $client = new Clients();
        $client->setFirstname($firstname)
               ->setLastname($lastname)
               ->setCompanyName($companyName)
               ->setEmail($email)
               ->setPhone($phone);

        return $client;
    }
}