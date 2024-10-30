<?php

namespace App\EntityListener;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use App\Entity\Mandate;
use App\Entity\MandateGroup;
use Doctrine\ORM\EntityManagerInterface;


class MandateListener
{

    private $mailer;
    private $entityManager;

    public function __construct(MailerInterface $mailer, EntityManagerInterface $entityManager)
    {
        $this->mailer = $mailer;
        $this->entityManager = $entityManager;
    }


    public function prePersist(Mandate $mandate)
    {

        $patient = $mandate->getMandateGroup()->getPatient();
        $mandate->setPatientFullname($patient['firstname'] . " " . $patient['lastname']);
        $recipient = $mandate->getMandateUser() ? $mandate->getMandateUser()->getEmail() : 'coordinateur@cohealth.ch';
        $date = \DateTime::createFromFormat('Y-m-d', $mandate->getBeginAt())->format('d-m-Y');


        $email = (new Email())
            ->from('no-reply@cohealth.ch')
            ->to($recipient)
            ->subject('Nouveau mandat')
            ->text('Vous avez reçu une nouvelle demande de mandat, veuillez vous connecter à CoHealth pour la consulter. Pour ' . $mandate->getPatientFullname() . '.');
        $this->mailer->send($email);
    }

    public function postPersist(Mandate $mandate)
    {
        $this->defineStatus($mandate);
    }


    public function postUpdate(Mandate $mandate)
    {
        $this->defineStatus($mandate);



        if ($mandate->getStatus() === 'DEFAULT-refusé') {
            $date = \DateTime::createFromFormat('Y-m-d', $mandate->getBeginAt())->format('d-m-Y');

            $email = (new Email())
                ->from('no-reply@cohealth.ch')
                ->to('coordinateur@cohealth.ch')
                ->subject('Mandat refusé')
                ->text('Vous avez reçu un refus de mandat à traiter.
            Début du mandat le ' . $date . ' pour ' . $mandate->getPatientFullname() . '.');
            $this->mailer->send($email);
        }
    }


    private function defineStatus(Mandate $mandate)
    {

        $mandateGroup = $mandate->getMandateGroup();

        if ($mandateGroup instanceof $mandateGroup) {
            $mandateGroupStatus = [];
            foreach ($mandateGroup->getMandates() as $value) {
                array_push($mandateGroupStatus, $value->getStatus());
            }
            if (count(array_unique($mandateGroupStatus)) === 1) {
                $mandateGroup->setStatus($mandateGroupStatus[0]);
                $this->entityManager->persist($mandateGroup);
                $this->entityManager->flush();
                return null;
            }
        }
    }
}
