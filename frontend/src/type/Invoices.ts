export type Invoices = {
    id: string;
    invoiceNumber: string;
    createdAt: string;
    amountHt: string;
    amountTtc: string;
    description: string;
    client: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
    user: {
        firstName: string;
        lastName: string;
        username: string;
        role: string;
        status: string;
        siren: string;
        siret: string;
        num_crs: string;
        capitalSocial: string;
        createdAt: string;
        updatedAt: string;
    };
    template: {
        id: string;
        name: string;
        description: string;
        logo: string;
        htmlContent: string;
        isDefault: boolean;
        styleConfig: string;
        user: {
            firstName: string;
            lastName: string;
            username: string;
            role: string;
            status: string;
            siren: string;
            siret: string;
            num_crs: string;
            capitalSocial: string;
            createdAt: string;
            updatedAt: string;
        };
    };
}


//Entity in php
    // public function getId(): ?int
    // {
    //     return $this->id;
    // }

    // public function getInvoiceNumber(): ?string
    // {
    //     return $this->invoice_number;
    // }

    // public function setInvoiceNumber(string $invoice_number): static
    // {
    //     $this->invoice_number = $invoice_number;

    //     return $this;
    // }

    // public function getCreatedAt(): ?\DateTimeImmutable
    // {
    //     return $this->created_at;
    // }

    // public function setCreatedAt(\DateTimeImmutable $created_at): static
    // {
    //     $this->created_at = $created_at;

    //     return $this;
    // }

    // public function getAmountHt(): ?string
    // {
    //     return $this->amount_ht;
    // }

    // public function setAmountHt(?string $amount_ht): static
    // {
    //     $this->amount_ht = $amount_ht;

    //     return $this;
    // }

    // public function getAmountTtc(): ?string
    // {
    //     return $this->amount_ttc;
    // }

    // public function setAmountTtc(string $amount_ttc): static
    // {
    //     $this->amount_ttc = $amount_ttc;

    //     return $this;
    // }

    // public function getDescription(): ?string
    // {
    //     return $this->description;
    // }

    // public function setDescription(?string $description): static
    // {
    //     $this->description = $description;

    //     return $this;
    // }

    // public function getClient(): ?Clients
    // {
    //     return $this->client;
    // }

    // public function setClient(?Clients $client): static
    // {
    //     $this->client = $client;

    //     return $this;
    // }

    // public function getUser(): ?User
    // {
    //     return $this->user;
    // }

    // public function setUser(?User $user): static
    // {
    //     $this->user = $user;

    //     return $this;
    // }