<?php
// api/src/Controller/CreateMediaObjectAction.php

namespace App\Controller;

use App\Entity\MediaObject;
use App\Repository\MandateRepository;
use App\Repository\MissionRepository;
use ApiPlatform\Api\IriConverterInterface;
use App\Repository\MandateGroupRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class CreateMediaObjectAction extends AbstractController
{

    public function __construct(private Security $security, private MissionRepository $missionRepository, private MandateRepository $mandateRepository, private MandateGroupRepository $mandateGroupRepository, private IriConverterInterface $iriConverter)
    {
    }

    public function __invoke(Request $request): MediaObject
    {
        $uploadedFile = $request->files->get('file');
        $type = $request->request->get('type');
        $status = $request->request->get('status');
        $comment = $request->request->get('comment');
        $missionID = $request->request->get('mission');
        $mission = $this->missionRepository->findOneBy(['id' => $missionID]);
        $mandateID = $request->request->get('mandate');
        $mandate = $this->mandateRepository->findOneBy(['id' => $mandateID]);
        $mandateID = $request->request->get('mandate');
        $mandate = $this->mandateRepository->findOneBy(['id' => $mandateID]);
        $mandategroupID = $request->request->get('mandateGroup');
        $mandateGroup = $this->mandateGroupRepository->findOneBy(['id' => $mandategroupID]);


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
        if ($mandateID) {
            $mediaObject->setMandate($mandate);
        }
        if ($mandategroupID) {
            $mediaObject->setMandateGroup($mandateGroup);
        }

        return $mediaObject;
    }
}
