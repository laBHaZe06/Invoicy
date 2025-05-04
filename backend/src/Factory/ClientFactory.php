<?php

namespace App\Factory;

use App\Dto\Client\ClientDto;

class ClientFactory
{
    public function create(
        string $firstname,
        string $lastname,
        string $companyName,
        string $email,
        string $phone,
        string $country,
        string $town,
    ): ClientDto {
        return new ClientDto(
            0, // Assuming ID is auto-generated
            $firstname,
            $lastname,
            $companyName,
            $email,
            $phone,
            $country,
            $town
        );
    }

    public function update(
        int $id,
        string $firstname,
        string $lastname,
        string $companyName,
        string $email,
        string $phone,
        string $country,
        string $town,
    ): ClientDto {
        return new ClientDto(
            $id,
            $firstname,
            $lastname,
            $companyName,
            $email,
            $phone,
            $country,
            $town
        );
    }
}
