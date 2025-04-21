<?php

namespace App\DataFixtures;

use App\Entity\Clients;
use App\Entity\Invoices;
use App\Entity\InvoiceTemplate;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private readonly UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }
    public function load(ObjectManager $manager): void
    {
        for ($i = 1; $i <= 5; $i++) {
            $user = new User();
            $user->setEmail("user$i@example.com")
                ->setFirstname("Prenom$i")
                ->setLastname("Nom$i")
                ->setStatut("Auto-entrepreneur")
                ->setSiren("123456789")
                ->setSiret("123456789000$i")
                ->setNumRcs("RCS$i")
                ->setCapitalSocial("1000")
                ->setVerified(true)
                ->setRoles(['ROLE_USER'])
                ->setCreatedAt(new \DateTimeImmutable())
                ->setUpdatedAt(new \DateTimeImmutable())
                ->setPassword($this->passwordHasher->hashPassword($user,"password$i"));

            $manager->persist($user);

            // Create Invoice Templates for each user
            for ($j = 1; $j <= 2; $j++) {
                $template = new InvoiceTemplate();
                $template->setName("Template $j - User $i")
                         ->setHtmlContent("<h1>Facture</h1><p>Contenu HTML</p>")
                         ->setStyleConfig(['color' => 'blue', 'font' => 'Arial'])
                         ->setIsDefault($j === 1)
                         ->setOwner($user);

                $manager->persist($template);
            }

            // Create Clients for each user
            for ($k = 1; $k <= 3; $k++) {
                $client = new Clients();
                $client->setFirstname("ClientPrenom$k")
                       ->setLastname("ClientNom$k")
                       ->setCompanyName("Company$k SARL")
                       ->setEmail("client$k@example.com")
                       ->setPhone("060000000$k");

                $manager->persist($client);

                // Create Invoices for each client
                for ($l = 1; $l <= 2; $l++) {
                    $invoice = new Invoices();
                    $invoice->setInvoiceNumber("INV-{$i}{$k}{$l}")
                            ->setAmountHt(rand(100, 1000))
                            ->setAmountTtc(rand(100, 1000) * 1.2)
                            ->setCreatedAt(new \DateTimeImmutable("-{$l} days"))
                            ->setDescription("Facture $l pour client $k")
                            ->setClient($client)
                            ->setUser($user);

                    $manager->persist($invoice);
                }
            }
        }

        $manager->flush();
    }
}
