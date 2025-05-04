<?php

namespace App\Repository;

use App\Entity\Invoices;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Invoices>
 */
class InvoicesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Invoices::class);
    }

    /**
     * Récupère les factures d'un utilisateur avec les informations du client (ville, pays, etc.).
     */
    public function findInvoicesWithClientInfo($user)
    {
        $qb = $this->createQueryBuilder('i')
            ->leftJoin('i.client', 'c')
            ->addSelect('c')
            ->where('i.user = :user')
            ->setParameter('user', $user);

        return $qb->getQuery()->getResult();
    }
}
