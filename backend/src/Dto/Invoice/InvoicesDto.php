<?php

namespace App\Dto\Invoice;

use Symfony\Component\Serializer\Annotation\Groups;

class InvoicesDto
{
    #[Groups(['invoices:read'])]
    public int $id;

    #[Groups(['invoices:read'])]
    public string $invoiceNumber;

    #[Groups(['invoices:read', 'invoices:write'])]
    public string $amountHt;

    #[Groups(['invoices:read', 'invoice:write'])]
    public string $amountTtc;

    #[Groups(['invoices:read', 'invoices:write'])]
    public string $description;

    public function __construct(
        int $id,
        string $invoiceNumber,
        string $amountHt,
        string $amountTtc,
        string $description
    ) {
        $this->id = $id;
        $this->invoiceNumber = $invoiceNumber;
        $this->amountHt = $amountHt;
        $this->amountTtc = $amountTtc;
        $this->description = $description;
    }
}
