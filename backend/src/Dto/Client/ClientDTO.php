<?php

namespace App\Dto\Client;

use App\Factory\ClientFactory;
use App\Factory\UserFactory;


class ClientDTO
{
    public function __construct(
        private $firstname,
        private $lastname,
        private $companyName,
        private $email,
        private $phone,
        private readonly ClientFactory $clientFactory,
        private readonly UserFactory $userFactory
    ) {
        $this->clientFactory = $clientFactory;
        $this->userFactory = $userFactory;
    }
    public function getFirstname(): string
    {
        return $this->firstname;
    }
    public function setFirstname(string $firstname): void
    {
        $this->firstname = $firstname;
    }
    public function getLastname(): string
    {
        return $this->lastname;
    }
    public function setLastname(string $lastname): void
    {
        $this->lastname = $lastname;
    }
    public function getCompanyName(): string
    {
        return $this->companyName;
    }
    public function setCompanyName(string $companyName): void
    {
        $this->companyName = $companyName;
    }
    public function getEmail(): string
    {
        return $this->email;
    }
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }
    public function getPhone(): string
    {
        return $this->phone;
    }
    public function setPhone(string $phone): void
    {
        $this->phone = $phone;
    }

}