<?php
// api/src/Controller/CreateMediaObjectAction.php

namespace App\Controller;

use App\Entity\MediaObject;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use App\Repository\MissionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;

#[AsController]
final class CreateMediaObjectAction extends AbstractController
{


    public function __construct(private Security $security)
    {
    }

    public function __invoke(Request $request): MediaObject
    {

        $uploadedFile = $request->files->get('file');
        $type = $request->request->get('type');
        $status = $request->request->get('status');
        $comment = $request->request->get('comment');

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

        return $mediaObject;
    }
}
