<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Dto\Invoice\InvoiceInput;
use App\Dto\Invoice\InvoiceOutput;
use App\Repository\InvoicesRepository;
use App\State\InvoiceProcessor;
use App\State\InvoiceProvider;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new Get(output: InvoiceOutput::class, provider: InvoiceProvider::class),
        new Post(input: InvoiceInput::class, processor: InvoiceProcessor::class),
        new Put(input: InvoiceInput::class, processor: InvoiceProcessor::class),
        new Delete(processor: InvoiceProcessor::class),
    ]
)]
#[ORM\Entity(repositoryClass: InvoicesRepository::class)]
class Invoices
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['invoices:read'])]
    private ?string $invoice_number = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 5, scale: 2, nullable: true)]
    #[Groups(['invoices:read', 'invoices:write'])]
    private ?string $amount_ht = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 5, scale: 2)]
    #[Groups(['invoices:read', 'invoices:write'])]
    private ?string $amount_ttc = null;

    #[ORM\Column(length: 355, nullable: true)]
    #[Groups(['invoices:read', 'invoices:write'])]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'invoices')]
    #[Groups(['invoices:read'])]
    private ?Clients $client = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getInvoiceNumber(): ?string
    {
        return $this->invoice_number;
    }

    public function setInvoiceNumber(string $invoice_number): static
    {
        $this->invoice_number = $invoice_number;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getAmountHt(): ?string
    {
        return $this->amount_ht;
    }

    public function setAmountHt(?string $amount_ht): static
    {
        $this->amount_ht = $amount_ht;

        return $this;
    }

    public function getAmountTtc(): ?string
    {
        return $this->amount_ttc;
    }

    public function setAmountTtc(string $amount_ttc): static
    {
        $this->amount_ttc = $amount_ttc;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getClient(): ?Clients
    {
        return $this->client;
    }

    public function setClient(?Clients $client): static
    {
        $this->client = $client;

        return $this;
    }
}
