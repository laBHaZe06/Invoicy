<?php

namespace App\Dto\Invoice;

use App\Dto\Client\ClientDto;
use App\Dto\User\UserDto;
use Symfony\Component\Serializer\Annotation\Groups;

class InvoicesDto
{
    #[Groups(['invoices:read'])]
    public string $invoiceNumber;

    #[Groups(['invoices:read', 'invoices:write'])]
    public string $amountHt;

    #[Groups(['invoices:read', 'invoice:write'])]
    public string $amountTtc;

    #[Groups(['invoices:read', 'invoices:write'])]
    public string $description;

    #[Groups(['invoices:read'])]
    public ?int $userId = null;

    #[Groups(['invoices:read'])]
    public ?string $userEmail = null;

    #[Groups(['invoices:read', 'invoices:write'])]
    public ?string $statut;

    #[Groups(['invoices:read'])]
    public ?UserDto $user;

    #[Groups(['invoices:read'])]
    public ?ClientDto $client = null;

    public function __construct(
        string $invoiceNumber,
        string $amountHt,
        string $amountTtc,
        string $description,
        ?string $statut,
        ?UserDto $user,
        ?ClientDto $client,
    ) {
        $this->invoiceNumber = $invoiceNumber;
        $this->amountHt = $amountHt;
        $this->amountTtc = $amountTtc;
        $this->description = $description;
        $this->statut = $statut;
        $this->user = $user;
        $this->client = $client;
    }
}
