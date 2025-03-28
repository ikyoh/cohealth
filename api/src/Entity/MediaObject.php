<?php
// api/src/Entity/MediaObject.php
namespace App\Entity;

use App\Controller\CreateMediaObjectAction;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use App\Entity\UserOwnedInterface;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;


#[Vich\Uploadable]
#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['media_object:read']],
    types: ['https://schema.org/MediaObject'],
    operations: [
        new GetCollection(),
        new Get(),
        new Delete(),
        new Put(),
        new Post(
            controller: CreateMediaObjectAction::class,
            deserialize: false,
            validationContext: ['groups' => ['Default', 'media_object_create']],
            openapiContext: [
                'requestBody' => [
                    'content' => [
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'file' => [
                                        'type' => 'string',
                                        'format' => 'binary'
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        )
    ]
)]
class MediaObject implements UserOwnedInterface
{
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    #[Groups(['media_object:read', 'users:read'])]
    private ?int $id = null;

    #[ApiProperty(types: ['https://schema.org/contentUrl'])]
    #[Groups(['media_object:read', 'users:read', 'user:read', 'mission:read', 'mandate:read', 'mandate_group:read'])]
    public ?string $contentUrl = null;

    #[Vich\UploadableField(mapping: "media_object", fileNameProperty: "filePath")]
    #[Assert\NotNull(groups: ['media_object_create'])]
    public ?File $file = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['media_object:read', 'users:read', 'user:read', 'mission:read', 'mandate:read', 'mandate_group:read'])]
    public ?string $filePath = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['media_object:read', 'mandate:read'])]
    private $type;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['media_object:read'])]
    private $status;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['media_object:read'])]
    private $createdAt;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['media_object:read', 'mission:read', 'mandate:read'])]
    private $comment;

    #[ORM\ManyToOne(targetEntity: Mission::class, inversedBy: 'documents')]
    #[Groups(['media_object:read'])]
    private $mission;

    #[ORM\ManyToOne(targetEntity: Mandate::class, inversedBy: 'documents')]
    #[Groups(['media_object:read'])]
    private $mandate;

    #[ORM\ManyToOne(targetEntity: MandateGroup::class, inversedBy: 'documents')]
    #[Groups(['media_object:read'])]
    private $mandateGroup;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'mediaObjects')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['media_object:read'])]
    private $user;


    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getURL(): ?string
    {
        return $this->contentUrl;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

    public function getMission(): ?Mission
    {
        return $this->mission;
    }

    public function setMission(?Mission $mission): self
    {
        $this->mission = $mission;

        return $this;
    }

    public function getMandate(): ?Mandate
    {
        return $this->mandate;
    }

    public function setMandate(?Mandate $mandate): self
    {
        $this->mandate = $mandate;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getMandateGroup(): ?MandateGroup
    {
        return $this->mandateGroup;
    }

    public function setMandateGroup(?MandateGroup $mandateGroup): self
    {
        $this->mandateGroup = $mandateGroup;

        return $this;
    }
}
