<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedListener
{
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $user = $event->getUser();
        $data = $event->getData();
        $data['firstName'] = $user->getFirstname();
        $data['lastName'] = $user->getLastname();
        $data['organization'] = $user->getOrganization();
        $data['phone'] = $user->getPhone();
        $data['mobile'] = $user->getMobile();
        $event->setData($data);
    }
}
