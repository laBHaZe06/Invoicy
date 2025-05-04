<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Dto\Client\ClientDto;
use App\Repository\ClientsRepository;

class ClientProvider implements ProviderInterface
{
    public function __construct(private ClientsRepository $repo)
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): ?ClientDto
    {
        $client = $this->repo->find($uriVariables['id'] ?? null);

        if (!$client) {
            return null;
        }

        return new ClientDto(
            $client->getId(),
            $client->getFirstname(),
            $client->getLastname(),
            $client->getCompanyName(),
            $client->getEmail(),
            $client->getPhone()
        );
    }
}
