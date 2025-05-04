<?php

namespace App\Security\Voter;

use App\Entity\Invoices;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

final class InvoicesVoter extends Voter
{
    public const EDIT = 'invoice_edit';
    public const VIEW = 'invoice_view';
    public const CREATE = 'invoice_create';
    public const DELETE = 'invoice_delete';

    protected function supports(string $attribute, mixed $subject): bool
    {
        return in_array($attribute, [
            self::EDIT,
            self::VIEW,
            self::CREATE,
            self::DELETE,
        ]) && $subject instanceof Invoices;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        if (!$user instanceof User) {
            return false;
        }

        /** @var Invoices $invoice */
        $invoice = $subject;

        return match ($attribute) {
            self::EDIT => $this->canEdit($invoice, $user),
            self::VIEW => $this->canView($invoice, $user),
            self::CREATE => $this->canCreate($invoice, $user),
            self::DELETE => $this->canDelete($invoice, $user),
            default => throw new \LogicException('This code should not be reached!'),
        };
    }

    private function canEdit(Invoices $invoice, User $user): bool
    {
        return $this->hasAccess($user);
    }

    private function canView(Invoices $invoice, User $user): bool
    {
        return $this->hasAccess($user);
    }

    private function canCreate(Invoices $invoice, User $user): bool
    {
        return $this->hasAccess($user);
    }

    private function canDelete(Invoices $invoice, User $user): bool
    {
        return $this->hasAccess($user);
    }

    private function hasAccess(User $user): bool
    {
        return in_array('ROLE_USER', $user->getRoles()) || in_array('ROLE_ADMIN', $user->getRoles());
    }
}
