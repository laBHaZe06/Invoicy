<?php
namespace App\Dto\Invoice;


class InvoiceOutput 
{
    public string $invoiceNumber;
    public string $amountHt;
    public string $amountTtc;
    public string $description;
    public ?int $clientId;
}