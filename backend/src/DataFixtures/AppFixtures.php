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
        $statuts = ['en attente', 'payée', 'rappel envoyé', 'non payée', 'facture prête'];

        // Pays => Villes compatibles avec cities.json
        $countries = [
            'France' => ['Paris', 'Lyon', 'Marseille'],
            'Italy' => ['Rome', 'Milan', 'Naples'],
            'Suisse' => ['Bern', 'Zurich', 'Geneva'],
            'Belgique' => ['Brussels', 'Antwerp', 'Ghent'],
            'Usa' => ['New York', 'San Francisco', 'Chicago'],
            'Chine' => ['Beijing', 'Shanghai', 'Guangzhou'],
            'Espagne' => ['Madrid', 'Barcelona', 'Valencia'],
            'Allemagne' => ['Berlin', 'Munich', 'Hamburg'],
            'Canada' => ['Toronto', 'Vancouver', 'Montreal'],
            'Japon' => ['Tokyo', 'Osaka', 'Kyoto'],
            'Brésil' => ['São Paulo', 'Rio de Janeiro', 'Brasília'],
            'Australie' => ['Sydney', 'Melbourne', 'Brisbane'],
            'Inde' => ['Mumbai', 'Delhi', 'Bangalore'],
            'Russie' => ['Moscow', 'Saint Petersburg', 'Novosibirsk'],
            'Royaume-Uni' => ['London', 'Manchester', 'Birmingham'],
            'Mexique' => ['Mexico City', 'Guadalajara', 'Monterrey'],
            'Pays-Bas' => ['Amsterdam', 'Rotterdam', 'The Hague'],
            'Turquie' => ['Istanbul', 'Ankara', 'Izmir'],
            'Suède' => ['Stockholm', 'Gothenburg', 'Malmö'],
            'Corée du Sud' => ['Seoul', 'Busan', 'Incheon'],
            'Afrique du Sud' => ['Johannesburg', 'Cape Town', 'Durban'],
        ];

        // Admin user
        $userAdmin = new User();
        $userAdmin->setEmail('borne.yoan@gmail.com')
            ->setFirstname('Yoan')
            ->setLastname('Borne')
            ->setStatut('Administrateur')
            ->setSiren(null)
            ->setSiret(null)
            ->setNumRcs(null)
            ->setCapitalSocial(null)
            ->setVerified(true)
            ->setRoles(['ROLE_SUPER_ADMIN'])
            ->setCreatedAt(new \DateTimeImmutable())
            ->setUpdatedAt(new \DateTimeImmutable())
            ->setPassword($this->passwordHasher->hashPassword($userAdmin, '@dministrator1987$'));

        $manager->persist($userAdmin);

        for ($i = 1; $i <= 5; ++$i) {
            $user = new User();
            $user->setEmail("user$i@example.com")
                ->setFirstname("Prenom$i")
                ->setLastname("Nom$i")
                ->setStatut('Auto-entrepreneur')
                ->setSiren('123456789')
                ->setSiret("123456789000$i")
                ->setNumRcs("RCS$i")
                ->setCapitalSocial('1000')
                ->setVerified(true)
                ->setRoles(['ROLE_USER'])
                ->setCreatedAt(new \DateTimeImmutable())
                ->setUpdatedAt(new \DateTimeImmutable())
                ->setPassword($this->passwordHasher->hashPassword($user, "password$i"));

            $manager->persist($user);

            // Templates
            for ($j = 1; $j <= 2; ++$j) {
                $template = new InvoiceTemplate();
                $template->setName("Template $j - User $i")
                    ->setHtmlContent('<h1>Facture</h1><p>Contenu HTML</p>')
                    ->setStyleConfig(['color' => 'blue', 'font' => 'Arial'])
                    ->setIsDefault(1 === $j)
                    ->setUser($user);

                $manager->persist($template);
            }

            // Clients
            for ($k = 1; $k <= 3; ++$k) {
                $countryCode = array_rand($countries);
                $town = $countries[$countryCode][array_rand($countries[$countryCode])];

                $client = new Clients();
                $client->setFirstname("ClientPrenom$k")
                    ->setLastname("ClientNom$k")
                    ->setCompanyName("Company$k SARL")
                    ->setEmail("client$k@example.com")
                    ->setPhone("060000000$k")
                    ->setCountry($countryCode)
                    ->setTown($town);

                $manager->persist($client);

                // Invoices
                for ($l = 1; $l <= 2; ++$l) {
                    $statut = $statuts[array_rand($statuts)];
                    $invoice = new Invoices();
                    $invoice->setInvoiceNumber("INV-{$i}{$k}{$l}")
                        ->setAmountHt(rand(100, 1000))
                        ->setAmountTtc(rand(100, 1000) * 1.2)
                        ->setStatut($statut)
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
