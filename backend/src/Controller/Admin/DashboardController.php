<?php

namespace App\Controller\Admin;

use App\Entity\Clients;
use App\Entity\Invoices;
use App\Entity\InvoiceTemplate;
use App\Entity\User;
use App\Repository\InvoicesRepository;
use App\Repository\InvoiceTemplateRepository;
use App\Repository\UserRepository;
use EasyCorp\Bundle\EasyAdminBundle\Attribute\AdminDashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[AdminDashboard(routePath: '/admin', routeName: 'admin')]
class DashboardController extends AbstractDashboardController
{
    public function __construct(
        private UserRepository $userRepository,
        private InvoiceTemplateRepository $invoiceTemplateRepository,
        private InvoicesRepository $invoicesRepository,
    ) {
        $this->userRepository = $userRepository;
        $this->invoiceTemplateRepository = $invoiceTemplateRepository;
        $this->invoicesRepository = $invoicesRepository;
    }

    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        // Exemple de données pour les inscriptions des utilisateurs par mois
        $labels = ['Janvier', 'Février', 'Mars'];
        $userRegistrations = [12, 19, 3];

        // Exemple de données pour les utilisateurs vérifiés et non vérifiés
        $userVerificationLabels = ['Vérifiés', 'Non vérifiés'];
        $userVerificationData = [80, 20];

        // Exemple de données pour les modèles de factures par utilisateur
        $invoiceTemplateLabels = ['Alice', 'Bob', 'Charlie'];
        $invoiceTemplateData = [5, 3, 7];

        // Exemple de données pour la somme totale des factures par mois
        $invoiceSumLabels = ['Janvier', 'Février', 'Mars'];
        $invoiceSumData = [1200, 1500, 900];

        return $this->render('admin/index.html.twig', [
            'labels' => $labels,
            'userRegistrations' => $userRegistrations,
            'userVerificationLabels' => $userVerificationLabels,
            'userVerificationData' => $userVerificationData,
            'invoiceTemplateLabels' => $invoiceTemplateLabels,
            'invoiceTemplateData' => $invoiceTemplateData,
            'invoiceSumLabels' => $invoiceSumLabels,
            'invoiceSumData' => $invoiceSumData,
        ]);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Invoicy admin');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::linkToCrud('Utilisateurs', 'fa fa-user', User::class);
        yield MenuItem::linkToCrud('Factures', 'fa fa-file-invoice', Invoices::class);
        yield MenuItem::linkToCrud('Modèles de facture', 'fa fa-copy', InvoiceTemplate::class);
        yield MenuItem::linkToCrud('Clients', 'fa fa-users', Clients::class);
    }
}
