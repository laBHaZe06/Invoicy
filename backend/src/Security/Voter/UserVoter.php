<?php

namespace App\Security\Voter;

use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

final class UserVoter extends Voter
{
    public const VIEW = 'view';
    public const EDIT = 'edit';
    public const DELETE = 'delete';
    public const RESET_PASSWORD = 'reset_password';
    public const ACTIVATE = 'activate';
    public const DEACTIVATE = 'deactivate';
    public const PROMOTE = 'promote';
    public const DEMOTE = 'demote';

    protected function supports(string $attribute, $subject): bool
    {
        return $subject instanceof User && in_array($attribute, [
            self::VIEW,
            self::EDIT,
            self::DELETE,
            self::RESET_PASSWORD,
            self::ACTIVATE,
            self::DEACTIVATE,
            self::PROMOTE,
            self::DEMOTE,
        ], true);
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $currentUser = $token->getUser();

        if (!$currentUser instanceof UserInterface || !$subject instanceof User) {
            return false;
        }

        return match ($attribute) {
            self::VIEW => $this->canView($subject, $currentUser),
            self::EDIT => $this->canEdit($subject, $currentUser),
            self::DELETE => $this->canDelete($subject, $currentUser),
            self::RESET_PASSWORD => $this->canResetPassword($subject, $currentUser),
            self::ACTIVATE => $this->isAdmin($currentUser),
            self::DEACTIVATE => $this->isAdmin($currentUser),
            self::PROMOTE => $this->isAdmin($currentUser),
            self::DEMOTE => $this->isAdmin($currentUser),
            default => false,
        };
    }

    private function canView(User $user, UserInterface $currentUser): bool
    {
        return $user === $currentUser || $this->isAdmin($currentUser);
    }

    private function canEdit(User $user, UserInterface $currentUser): bool
    {
        return $user === $currentUser || $this->isAdmin($currentUser);
    }

    private function canDelete(User $user, UserInterface $currentUser): bool
    {
        return $user === $currentUser || $this->isAdmin($currentUser);
    }

    private function canResetPassword(User $user, UserInterface $currentUser): bool
    {
        return $user === $currentUser || $this->isAdmin($currentUser);
    }

    private function isAdmin(UserInterface $user): bool
    {
        return in_array('ROLE_ADMIN', $user->getRoles(), true);
    }
}
