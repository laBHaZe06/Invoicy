<?php

namespace App\Service;

use App\Dto\Invoice\InvoicesDto;
use App\Repository\InvoicesRepository;

class InvoiceService
{
    public function __construct(
        private readonly InvoicesRepository $invoicesRepository,
    ) {}

    /**
     * @return InvoicesDto[]
     */
    public function getAll(): array
    {
        $invoices = $this->invoicesRepository->findAll();
        $invoicesDto = [];

        foreach ($invoices as $invoice) {
            $invoicesDto[] = new InvoicesDto(
                $invoice->getId(),
                $invoice->getInvoiceNumber(),
                $invoice->getAmountHt(),
                $invoice->getAmountTtc(),
                $invoice->getDescription()
            );
        }

        return $invoicesDto;
    }

    public function getById(int $id): ?InvoicesDto
    {
        $invoice = $this->invoicesRepository->find($id);

        if (!$invoice) {
            return null;
        }

        return new InvoicesDto(
            $invoice->getId(),
            $invoice->getInvoiceNumber(),
            $invoice->getAmountHt(),
            $invoice->getAmountTtc(),
            $invoice->getDescription()
        );
    }
}
