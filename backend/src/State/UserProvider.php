<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Dto\User\UserDto;
use App\Repository\UserRepository;

class UserProvider implements ProviderInterface
{
    public function __construct(private UserRepository $repo)
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): ?UserDto
    {
        $user = $this->repo->find($uriVariables['id'] ?? null);

        if (!$user) {
            return null;
        }

        $invoices = $user->getInvoices();
        $template = $user->getInvoiceTemplates();

        return new UserDto(
            id: $user->getId(),
            email: $user->getEmail(),
            firstname : $user->getFirstname(),
            lastname : $user->getLastname(),
            password: $user->getPassword(),
            roles: $user->getRoles(),
            statut: $user->getStatut(),
            siren: $user->getSiren(),
            siret: $user->getSiret(),
            numRcs: $user->getNumRcs(),
            companyName : $user->getCompanyName(),
            capitalSocial: $user->getCapitalSocial(),
            logo: $user->getLogo(),
            invoices : $invoices->getInvoiceNumber(),
            invoicesTemplate: $template->getName()
        );
    }
}
