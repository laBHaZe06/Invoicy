<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Dto\Invoice\InvoiceOutput;
use App\Entity\Invoices;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;

final class InvoiceProvider implements ProviderInterface
{
    public function __construct(private EntityManagerInterface $entityManager, private Security $security) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array
    {
        $user = $this->security->getUser();
        $invoices = $this->entityManager->getRepository(Invoices::class)->findBy(['owner' => $user]);

        return array_map(fn(Invoices $invoice) => new InvoiceOutput(
            id: $invoice->getId(),
            invoiceNumber: $invoice->getInvoiceNumber(),
            createdAt: $invoice->getCreatedAt(),
            amountHt: $invoice->getAmountHt(),
            amountTtc: $invoice->getAmountTtc(),
            description: $invoice->getDescription(),
            clientId: $invoice->getClient()?->getId()
        ), $invoices);
    }
}