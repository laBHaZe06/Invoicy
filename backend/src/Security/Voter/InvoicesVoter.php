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
    const DELETE = 'invoice_delete';
    const LIST = 'invoice_list';
    const EXPORT = 'invoice_export';
    const IMPORT = 'invoice_import';
    const DOWNLOAD = 'invoice_download';
    const PRINT = 'invoice_print';

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
            self::CREATE => $this->canCreate($invoices, $user),
            self::DELETE => $this->canDelete($invoices, $user),
            self::LIST => $this->canList($invoices, $user),
            self::EXPORT => $this->canExport($invoices, $user),
            self::IMPORT => $this->canImport($invoices, $user),
            self::DOWNLOAD => $this->canDownload($invoices, $user),
            self::PRINT => $this->canPrint($invoices, $user),
            default => throw new \LogicException('This code should not be reached!')
        };

    }

    private function canEdit(Invoices $invoices, User $user): bool
    {
        return $user === $this->getUser() && $user->getRoles() === ['ROLE_USER'];
    }
    private function canView(Invoices $invoices, User $user): bool
    {
        return $user === $this->getUser() && $user->getRoles() === ['ROLE_USER'];
    }

    private function canCreate(Invoices $invoices, User $user): bool
    {
        return $user === $this->getUser() && $user->getRoles() === ['ROLE_USER'];
    }

    private function canDelete(Invoices $invoices, User $user): bool
    {
        return $user === $this->getUser() && $user->getRoles() === ['ROLE_USER'];
    }

    private function canList(Invoices $invoices, User $user): bool
    {
        return $user === $this->getUser() && $user->getRoles() === ['ROLE_USER'];
    }

    private function canExport(Invoices $invoices, User $user): bool
    {
        return $user === $this->getUser() && $user->getRoles() === ['ROLE_USER'];
    }

    private function canImport(Invoices $invoices, User $user): bool
    {
        return $user === $this->getUser() && $user->getRoles() === ['ROLE_USER'];
    }

    private function canPrint(Invoices $invoices, User $user): bool
    {
        return $user === $this->getUser() && $user->getRoles() === ['ROLE_USER'];
    }

    private function canDownload(Invoices $invoices, User $user): bool
    {
        return $user === $this->getUser() && $user->getRoles() === ['ROLE_USER'];
    }

    private function getUser(): User
    {
        return $this->getUser();
    }

}
