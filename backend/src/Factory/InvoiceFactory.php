<?php

namespace App\Factory;

use App\Dto\Invoice\InvoicesDto;

class InvoiceFactory
{
    public function create(int $id, string $invoiceNumber, string $amountHt, string $amountTtc, string $description): InvoicesDto
    {
        return new InvoicesDto($id, $invoiceNumber, $amountHt, $amountTtc, $description);
    }

    public function updateInvoice(int $id, string $invoiceNumber, string $amountHt, string $amountTtc, string $description): InvoicesDto
    {
        return new InvoicesDto($id, $invoiceNumber, $amountHt, $amountTtc, $description);
    }

}
