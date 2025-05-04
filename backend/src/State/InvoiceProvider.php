<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Dto\Client\ClientDto;
use App\Dto\Invoice\InvoicesDto;
use App\Repository\InvoicesRepository;

final class InvoiceProvider implements ProviderInterface
{
    public function __construct(private InvoicesRepository $invoicesRepository)
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): iterable|object|null
    {
        if ($operation instanceof \ApiPlatform\Metadata\GetCollection) {
            $invoices = $this->invoicesRepository->findAll();

            $invoiceDtos = [];
            foreach ($invoices as $invoice) {
                $client = $invoice->getClient();
                $clientDto = $client ? new ClientDto(
                    id: $client->getId(),
                    firstname: $client->getFirstName(),
                    lastname: $client->getLastName(),
                    email: $client->getEmail(),
                    phone: $client->getPhone(),
                    companyName: $client->getCompanyName(),
                    country: $client->getCountry(),
                    town: $client->getTown()
                ) : null;

                $invoiceDtos[] = new InvoicesDto(
                    invoiceNumber: $invoice->getInvoiceNumber(),
                    amountHt: $invoice->getAmountHt(),
                    amountTtc: $invoice->getAmountTtc(),
                    description: $invoice->getDescription(),
                    userId: $invoice->getUser()?->getId(),
                    userEmail: $invoice->getUser()?->getEmail(),
                    client: $clientDto,
                    statut: $invoice->getStatut()
                );
            }

            return $invoiceDtos;
        }

        if ($operation instanceof \ApiPlatform\Metadata\Get) {
            $invoice = $this->invoicesRepository->find($uriVariables['id'] ?? null);
            if (!$invoice) {
                return null;
            }

            $client = $invoice->getClient();
            $clientDto = $client ? new ClientDto(
                id: $client->getId(),
                firstname: $client->getFirstName(),
                lastname: $client->getLastName(),
                email: $client->getEmail(),
                phone: $client->getPhone(),
                companyName: $client->getCompanyName(),
                country: $client->getCountry(),
                town: $client->getTown()
            ) : null;

            return new InvoicesDto(
                invoiceNumber: $invoice->getInvoiceNumber(),
                amountHt: $invoice->getAmountHt(),
                amountTtc: $invoice->getAmountTtc(),
                description: $invoice->getDescription(),
                userId: $invoice->getUser()?->getId(),
                userEmail: $invoice->getUser()?->getEmail(),
                client: $clientDto,
                statut: $invoice->getStatut()
            );
        }

        return null;
    }
}
