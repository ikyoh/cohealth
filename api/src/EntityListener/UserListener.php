<?php

namespace App\EntityListener;

use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserListener
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function prePersist(User $user)
    {
        $this->encodePassword($user);
    }

    // public function preUpdate(User $user)
    // {
    //     $this->encodePassword($user);
    // }

    /**
     * Encode password based on plain password
     *
     * @param User $user
     * @return void
     */
    public function encodePassword(User $user)
    {
        if ($user->getPassword() === null) {
            return;
        }

        $hash = $this->hasher->hashPassword($user, $user->getPassword());
        $user->setPassword($hash);
    
    }
}
