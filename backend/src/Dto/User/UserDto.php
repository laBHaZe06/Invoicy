<?php

namespace App\Dto\User;

use App\Dto\Invoice\InvoicesDto;
use App\Dto\InvoiceTemplate\InvoiceTemplateDto;
use Symfony\Component\Serializer\Annotation\Groups;

class UserDto
{
    #[Groups(['user:read'])]
    public int $id;

    #[Groups(['user:read', 'user:write'])]
    public string $firsname;

    #[Groups(['user:read', 'user:write'])]
    public string $lastname;

    #[Groups(['user:read', 'user:write'])]
    public string $email;

    // #[Groups(['user:read', 'user:write'])]
    // public string $password;

    #[Groups(['user:read'])]
    public array $roles;

    #[Groups(['user:read', 'user:write'])]
    public ?string $statut;

    #[Groups(['user:read', 'user:write'])]
    public ?string $siren;

    #[Groups(['user:read', 'user:write'])]
    public ?string $siret;

    #[Groups(['user:read', 'user:write'])]
    public ?string $numRcs;

    #[Groups(['user:read', 'user:write'])]
    public ?string $capitalSocial;

    #[Groups(['user:read', 'user:write'])]
    public ?string $logo;

    #[Groups(['user:read'])]
    public ?array $invoices = [];

    #[Groups(['user:read'])]
    public ?array $invoicesTemplate = [];

    /**
     * @param InvoicesDto[]        $invoices
     * @param InvoiceTemplateDto[] $invoicesTemplate
     */
    public function __construct(
        int $id,
        string $firstname,
        string $lastname,
        string $email,
        // string $password,
        array $roles,
        ?string $statut,
        ?string $siren,
        ?string $siret,
        ?string $numRcs,
        ?string $capitalSocial,
        ?string $logo,
        ?array $invoices,
        ?array $invoicesTemplate,
    ) {
        $this->id = $id;
        $this->firsname = $firstname;
        $this->lastname = $lastname;
        $this->email = $email;
        // $this->password = $password;
        $this->roles = $roles;
        $this->statut = $statut;
        $this->siren = $siren;
        $this->siret = $siret;
        $this->numRcs = $numRcs;
        $this->capitalSocial = $capitalSocial;
        $this->logo = $logo;
        $this->invoices = $invoices;
        $this->invoicesTemplate = $invoicesTemplate;
    }
}
