<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Dto\Invoice\InvoiceOutput;
use App\Dto\Invoice\InvoiceInput;
use App\Entity\Invoices;
use App\Repository\ClientsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * @implements ProcessorInterface<InvoiceInput, InvoiceOutput>
 */
final class InvoiceProcessor implements ProcessorInterface
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ClientsRepository $clientsRepository
    ) {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): InvoiceOutput
    {
        if (!$data instanceof InvoiceInput) {
            throw new \InvalidArgumentException('Invalid data type');
        }

        // Récupérer le client depuis l'ID
        $client = $this->clientsRepository->find($data->clientId);
        if (!$client) {
            throw new NotFoundHttpException('Client not found');
        }

        $invoice = new Invoices();
        $invoice->setInvoiceNumber($data->invoiceNumber);
        $invoice->setCreatedAt($data->createdAt);
        $invoice->setAmountHt($data->amountHt);
        $invoice->setAmountTtc($data->amountTtc);
        $invoice->setDescription($data->description);
        $invoice->setClient($client);


        $this->entityManager->persist($invoice);
        $this->entityManager->flush();

        return new InvoiceOutput(
            $invoice->getId(),
            $invoice->getInvoiceNumber(),
            $invoice->getCreatedAt(),
            $invoice->getAmountHt(),
            $invoice->getAmountTtc(),
            $invoice->getDescription(),
            $invoice->getClient() ? $invoice->getClient()->getId() : null
        );
    }
}