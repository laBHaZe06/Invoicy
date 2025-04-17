<?php

namespace App\Dto\Invoice;

use Symfony\Component\Validator\Constraints as Assert;

class InvoiceInput
{
    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    public string $invoiceNumber;

    #[Assert\NotBlank]
    public \DateTimeImmutable $createdAt;

    #[Assert\NotBlank]
    #[Assert\Type(type: 'numeric')]
    public ?string $amountHt = null;

    #[Assert\NotBlank]
    #[Assert\Type(type: 'numeric')]
    public ?string $amountTtc = null;

    public ?string $description = null;

    #[Assert\NotBlank]
    public int $clientId;
}