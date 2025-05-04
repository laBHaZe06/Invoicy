<?php

namespace App\Controller;

use App\Dto\Client\ClientDto;
use App\Dto\Invoice\InvoicesDto;
use App\Dto\User\UserDto;
use App\Entity\Invoices;
use App\Repository\InvoicesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api')]
final class UserController extends AbstractController
{
    public function __construct(
        private InvoicesRepository $invoicesRepo,
        private SerializerInterface $serializer,
        private Security $security,
    ) {
        $this->invoicesRepo = $invoicesRepo;
        $this->serializer = $serializer;
        $this->security = $security;
    }

    #[Route('/me/invoices', name: 'me_invoices', methods: ['GET'])]
    public function getUserInvoices(): JsonResponse
    {
        try {
            $user = $this->security->getUser();

            if (!$user) {
                return new JsonResponse(['error' => 'Non authentifié'], 401);
            }

            $invoices = $this->invoicesRepo->findInvoicesWithClientInfo($user);

            $dtos = array_map(function (Invoices $invoice) {
                $client = $invoice->getClient();
                $userEntity = $invoice->getUser();

                $clientDto = new ClientDto(
                    $client->getId(),
                    $client->getFirstName(),
                    $client->getLastName(),
                    $client->getCompanyName(),
                    $client->getEmail(),
                    $client->getPhone(),
                    $client->getCountry(),
                    $client->getTown()
                );

                $userDto = new UserDto(
                    $userEntity->getId(),
                    $userEntity->getFirstname(),
                    $userEntity->getLastname(),
                    $userEntity->getEmail(),
                    $userEntity->getRoles(),
                    $userEntity->getStatut(),
                    $userEntity->getSiren(),
                    $userEntity->getSiret(),
                    $userEntity->getNumRcs(),
                    $userEntity->getCapitalSocial(),
                    $userEntity->getLogo(),
                    $userEntity->getInvoices()->toArray() ?? [],
                    $userEntity->getInvoiceTemplates()->toArray(),
                );

                return new InvoicesDto(
                    invoiceNumber: (string) $invoice->getInvoiceNumber(),
                    amountHt: (string) $invoice->getAmountHt(),
                    amountTtc: (string) $invoice->getAmountTtc(),
                    description: (string) $invoice->getDescription(),
                    user: $userDto,
                    client: $clientDto,
                    statut: $invoice->getStatut()
                );
            }, $invoices);

            $json = $this->serializer->serialize($dtos, 'json', ['groups' => 'invoices:read']);

            return new JsonResponse($json, 200, [], true);
        } catch (\Throwable $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }
    }
}
