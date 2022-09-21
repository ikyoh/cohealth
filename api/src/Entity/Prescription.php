<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\UserOwnedInterface;
use App\Repository\PrescriptionRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PrescriptionRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['prescriptions:read']],
    denormalizationContext: ['groups' => ['prescription:write']],
    itemOperations: [
        'get' => [
            'normalization_context' => ['groups' => ['prescription:read']],
        ],
        'put' => []
    ],
)]
class Prescription implements UserOwnedInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["prescriptions:read", "mission:read"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["prescriptions:read", "prescription:read", "prescription:write", "mission:write", "mission:read", "missions:read"])]
    private $type;

    // brouillon
    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["prescriptions:read", "prescription:read", "prescription:write", "mission:write", "mission:read", "missions:read"])] 
    private $status = "brouillon";

    #[ORM\Column(type: 'json', nullable: true)]
    #[Groups(["prescriptions:read", "prescription:read", "prescription:write", "mission:write", "mission:read", "missions:read"])]
    private $content = [];

    #[ORM\Column(type: 'datetime')]
    #[Groups(["prescriptions:read", "prescription:read", "prescription:write", "mission:write", "mission:read", "missions:read"])]
    private $createdAt;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["prescriptions:read", "prescription:read", "prescription:write", "mission:write", "mission:read", "missions:read"])]
    private $user;

    #[ORM\ManyToOne(targetEntity: Mission::class, inversedBy: 'prescriptions')]
    #[Groups(["prescriptions:read", "prescription:read", "prescription:write"])]
    private $mission;


    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getContent(): ?array
    {
        return $this->content;
    }

    public function setContent(?array $content): self
    {
        $this->content = $content;

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

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



}
