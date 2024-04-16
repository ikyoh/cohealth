<?php

namespace App\EntityListener;

use App\Entity\Mandate;


class MandateListener
{

    public function prePersist(Mandate $mandate)
    {
        $patient = $mandate->getMandateGroup()->getPatient();
        $mandate->setPatientFullname($patient['firstname'] . " " . $patient['lastname']);
    }
    
}
