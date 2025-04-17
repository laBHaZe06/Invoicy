<?php

namespace App\Security\Voter;

use App\Entity\Invoices;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

final class InvoicesVoter extends Voter
{
    const EDIT = 'invoice_edit';
    const VIEW = 'invoice_view';
    const CREATE = 'invoice_create';


    protected function supports(string $attribute, mixed $subject): bool
    {
        if(!in_array($attribute, [self::EDIT, self::VIEW])) {
            return false; 
        }

        if(!$subject instanceof Invoices) {
            return false;
        }

        return true;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUserIdentifier();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        $invoices = $subject; 
        // if the user is anonymous, do not grant access
        if (!$invoices instanceof Invoices) {
            return false;
        }
        
        return match($subject) {
            self::EDIT => $this->canEdit($invoices, $user),
            self::VIEW => $this->canView($invoices, $user),
            default => throw new \LogicException('This code should not be reached!')
        };

    }

    private function canEdit(Invoices $invoices, User $user): bool
    {
        return $user === $this->getUser();
    }
    private function canView(Invoices $invoices, User $user): bool
    {
        return $user === $this->getUser();
    }
    private function getUser(): User
    {
        return $this->getUser();
    }


    // private function canEdit(Invoices $invoices, User $user) {
    //     return $user === $this->getUser();
    // }
}
