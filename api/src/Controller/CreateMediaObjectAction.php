<?php
// api/src/Controller/CreateMediaObjectAction.php

namespace App\Controller;

use App\Entity\MediaObject;
use App\Entity\Mission;
use App\Repository\MissionRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use ApiPlatform\Api\IriConverterInterface;

#[AsController]
final class CreateMediaObjectAction extends AbstractController
{


    
    public function __construct(private Security $security, private MissionRepository $missionRepository, private IriConverterInterface $iriConverter)
    {
    }

    public function __invoke(Request $request): MediaObject
    {
        $uploadedFile = $request->files->get('file');
        $type = $request->request->get('type');
        $status = $request->request->get('status');
        $comment = $request->request->get('comment');
        $missionID= $request->request->get('mission');
        $mission = $this->missionRepository->findOneBy(['id' => $missionID]);

        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $mediaObject = new MediaObject();
        $mediaObject->setUser($this->security->getUser());
        $mediaObject->file = $uploadedFile;
        if ($type) {
            $mediaObject->setType($type);
        }
        if ($status) {
            $mediaObject->setStatus($status);
        }
        if ($comment) {
            $mediaObject->setComment($comment);
        }
        if ($missionID) {
            $mediaObject->setMission($mission);
        }

        return $mediaObject;
    }
}

