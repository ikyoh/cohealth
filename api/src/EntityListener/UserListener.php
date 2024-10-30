<?php

namespace App\EntityListener;

use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;

class UserListener
{
    private UserPasswordHasherInterface $hasher;
    private $mailer;

    public function __construct(UserPasswordHasherInterface $hasher, MailerInterface $mailer)
    {
        $this->hasher = $hasher;
        $this->mailer = $mailer;
    }


    /**
     * Encode password before persisting user
     * and send mail to Admin to inform about new user
     * @param User $user
     * @return void
     */
    public function prePersist(User $user)
    {
        $this->encodePassword($user);
        $this->sendMail();
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

    public function sendMail(): void
    {
        $message = (new Email())
            ->from('no-reply@cohealth.ch')
            ->to('administrateur@cohealth.ch')
            ->subject("Un nouvel utilisateur vient de s'enregistrer")
            ->text(sprintf("Nouvel utilisateur"));

        $this->mailer->send($message);
    }
}
