<?php

namespace App\Factory;

use App\Dto\Invoice\InvoicesDto;

class InvoiceFactory
{
    public function create(int $id, string $invoiceNumber, string $amountHt, string $amountTtc, string $description): InvoicesDto
    {
        return new InvoicesDto(
            $invoiceNumber,
            $amountHt,
            $amountTtc,
            $description,
            null, // $statut
            null, // $user
            null  // $client
        );
    }

    public function updateInvoice(int $id, string $invoiceNumber, string $amountHt, string $amountTtc, string $description, ?string $statut = null, ?string $user = null, ?string $client = null): InvoicesDto
    {
        return new InvoicesDto($id, $invoiceNumber, $amountHt, $amountTtc, $description, $statut, $user, $client);
    }
}
