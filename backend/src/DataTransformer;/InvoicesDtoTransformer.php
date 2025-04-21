<?php

namespace App\DataTransformer;

use ApiPlatform\Dto\DtoInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use App\Dto\Invoice\InvoicesDto;
use App\Entity\Invoices;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

final class InvoicesDtoTransformer implements DenormalizerInterface
{
    public function getSupportedTypes(?string $format): array
    {
        return [InvoicesDto::class => true];
    }
    public function __construct(
        private readonly ObjectNormalizer $normalizer
    ) {}

    public function supportsDenormalization(mixed $data, string $type, string $format = null, array $context = []): bool
    {
        return $type === InvoicesDto::class;
    }
    public function denormalize($data, $type, $format = null, array $context = []): InvoicesDto
    {
        // Tu peux améliorer ici selon les règles métier
        return new InvoicesDto(
            $data['id'] ?? 0,
            $data['invoiceNumber'] ?? '',
            $data['amountHt'] ?? '0.00',
            $data['amountTtc'] ?? '0.00',
            $data['description'] ?? ''
        );
    }
}
