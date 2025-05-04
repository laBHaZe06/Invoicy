<?php

namespace App\Factory;

use App\Dto\InvoiceTemplateDto\InvoiceTemplateDto;

// use App\Dto\User\UserDto;

class InvoiceTemplateFactory
{
    public function create(
        string $name,
        ?string $description,
        ?string $htmlContent,
        ?array $styleConfig,
        ?bool $isDefault,
        // ?UserDto $owner
    ): InvoiceTemplateDto {
        $template = new InvoiceTemplateDto(
            $name,
            $description,
            $htmlContent,
            $styleConfig ? json_encode($styleConfig) : null,
            $isDefault,
        );

        return $template;
    }
}
