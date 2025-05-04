<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Dto\InvoiceTemplate\InvoiceTemplateDto;
use App\Repository\InvoiceTemplateRepository;

class InvoiceTemplateProvider implements ProviderInterface
{
    public function __construct(private InvoiceTemplateRepository $repo)
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): ?InvoiceTemplateDto
    {
        $invoiceTemplate = $this->repo->find($uriVariables['id'] ?? null);

        if (!$invoiceTemplate) {
            return null;
        }

        return new InvoiceTemplateDto(
            $invoiceTemplate->getName(),
            $invoiceTemplate->getDescription(),
            $invoiceTemplate->getHtmlContent(),
            $invoiceTemplate->getStyleConfig(),
            $invoiceTemplate->isDefault(),
            $invoiceTemplate->getUser()
        );
    }
}
