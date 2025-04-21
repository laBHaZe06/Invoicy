<?php
namespace App\State\Invoice;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Dto\Invoice\InvoicesDto;
use App\Repository\InvoicesRepository;

class InvoiceProvider implements ProviderInterface
{
    public function __construct(private InvoicesRepository $repo) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): ?InvoicesDto
    {
        $invoice = $this->repo->find($uriVariables['id'] ?? null);

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