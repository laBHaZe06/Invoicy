<?php

namespace App\Controller;



use App\Service\InvoiceService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api')]
final class InvoicesController extends AbstractController
{
    public function __construct(
        private  InvoiceService $invoiceService,
        private  SerializerInterface $serializer,
    )
    {
        $this->invoiceService = $invoiceService;
        $this->serializer = $serializer;
    
    }
    #[Route('/invoices', name: 'app_invoices')]
    #[IsGranted('inoices_list', message: 'You do not have permission to view this invoice.')]
    public function index(): JsonResponse
    {
        $invoices = $this->invoiceService->getAll();
        $jsonInvoices = $this->serializer->serialize($invoices, 'json', ['groups' => 'invoice:read']);
        
        return $this->json([
            'invoices' => json_decode($jsonInvoices),
        ]);
    }
    #[Route('/invoices/{id}', name: 'app_invoices_id')]
    #[IsGranted('invoice_view', message: 'You do not have permission to view this invoice.')]
    public function show(int $id): JsonResponse
    {
        $invoice = $this->invoiceService->getById($id);
        if (!$invoice) {
            return $this->json([
                'message' => 'Invoice not found',
            ], 404);
        }
        $jsonInvoice = $this->serializer->serialize($invoice, 'json', ['groups' => 'invoice:read']);
        
        return $this->json([
            'invoice' => json_decode($jsonInvoice),
        ]);
    }



}
