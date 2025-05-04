<?php

namespace App\DataTransformer;

use App\Dto\Client\ClientDto;
use App\Dto\Invoice\InvoicesDto;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

final class InvoicesDtoTransformer implements DenormalizerInterface
{
    public function __construct(
        private readonly ObjectNormalizer $normalizer,
    ) {
    }

    public function getSupportedTypes(?string $format): array
    {
        return [InvoicesDto::class => true];
    }

    public function supportsDenormalization(mixed $data, string $type, ?string $format = null, array $context = []): bool
    {
        return InvoicesDto::class === $type;
    }

    public function denormalize($data, $type, $format = null, array $context = []): InvoicesDto
    {
        // Extraction des données utilisateur
        $user = $data['user'] ?? null;

        // Extraction des données client
        $clientData = $data['client'] ?? null;

        $clientDto = null;
        if (is_array($clientData)) {
            $clientDto = new ClientDto(
                $clientData['id'] ?? null,
                $clientData['firstName'] ?? null,
                $clientData['lastName'] ?? null,
                $clientData['company'] ?? null,
                $clientData['email'] ?? null,
                $clientData['phone'] ?? null,
                $clientData['country'] ?? null,
                $clientData['town'] ?? null
            );
        }

        return new InvoicesDto(
            $data['invoiceNumber'] ?? '',
            $data['amountHt'] ?? '0.00',
            $data['amountTtc'] ?? '0.00',
            $data['description'] ?? '',
            $user['id'] ?? null,
            $user['email'] ?? null,
            $clientDto,
            $data['statut'] ?? null
        );
    }
}
