<?php
namespace App\Factory;

use App\Entity\InvoiceTemplate;
use App\Entity\User;

class InvoiceTemplateFactory
{
    public function create(
        string $name,
        ?string $htmlContent,
        ?array $styleConfig,
        ?bool $isDefault,
        ?User $owner
    ): InvoiceTemplate {
        $template = new InvoiceTemplate();
        $template->setName($name)
                 ->setHtmlContent($htmlContent)
                 ->setStyleConfig($styleConfig)
                 ->setIsDefault($isDefault)
                 ->setOwner($owner);

        return $template;
    }
}