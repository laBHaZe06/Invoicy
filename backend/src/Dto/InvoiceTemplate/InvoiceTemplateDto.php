<?php

namespace App\Dto\InvoiceTemplate;

use App\Entity\User;
use Symfony\Component\Serializer\Annotation\Groups;

class InvoiceTemplateDto
{
    #[Groups(['invoice_template:read', 'invoice_template:write'])]
    public string $name;

    #[Groups(['invoice_template:read', 'invoice_template:write'])]
    public string $description;

    #[Groups(['invoice_template:read', 'invoice_template:write'])]
    public string $htmlContent;

    #[Groups(['invoice_template:read', 'invoice_template:write'])]
    public string $styleConfig;

    #[Groups(['invoice_template:read', 'invoice_template:write'])]
    public bool $isDefault;

    #[Groups(['invoice_template:read'])]
    public ?User $user = null;

    public function __construct(
        string $name,
        string $description,
        string $htmlContent,
        string $styleConfig,
        bool $isDefault = false,
        ?User $user = null,
    ) {
        $this->name = $name;
        $this->description = $description;
        $this->htmlContent = $htmlContent;
        $this->styleConfig = $styleConfig;
        $this->isDefault = $isDefault;
        $this->user = $user;
    }
}
