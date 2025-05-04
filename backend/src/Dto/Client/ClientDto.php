<?php

namespace App\Dto\Client;

use Symfony\Component\Serializer\Annotation\Groups;

class ClientDto
{
    #[Groups(['client:read', 'invoices:read'])]
    public int $id;

    #[Groups(['client:read', 'client:write', 'invoices:read'])]
    public string $firstname;

    #[Groups(['client:read', 'client:write', 'invoices:read'])]
    public string $lastname;

    #[Groups(['client:read', 'client:write', 'invoices:read'])]
    public string $companyName;

    #[Groups(['client:read', 'client:write', 'invoices:read'])]
    public string $email;

    #[Groups(['client:read', 'client:write', 'invoices:read'])]
    public string $phone;

    #[Groups(['client:read', 'client:write', 'invoices:read'])]
    public string $country;

    #[Groups(['client:read', 'client:write', 'invoices:read'])]
    public string $town;

    public function __construct(
        int $id,
        string $firstname,
        string $lastname,
        string $companyName,
        string $email,
        string $phone,
        string $country,
        string $town,
    ) {
        $this->id = $id;
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->companyName = $companyName;
        $this->email = $email;
        $this->phone = $phone;
        $this->country = $country;
        $this->town = $town;
    }
}
