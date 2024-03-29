<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\UserOwnedInterface;
use App\Repository\PrescriptionRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\GetCollection;

#[ORM\Entity(repositoryClass: PrescriptionRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['prescriptions:read']],
    denormalizationContext: ['groups' => ['prescription:write']],
    operations: [
        new GetCollection(),
        new Get(normalizationContext: ['groups' => ['prescription:read']]),
        new Put(),
        new Post()
    ]
)]

class Prescription implements UserOwnedInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["prescriptions:read", "prescription:read"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["prescriptions:read", "prescription:read", "prescription:write", "mission:write", "missions:read"])]
    private $type;

    // brouillon, 
    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["prescriptions:read", "prescription:read", "prescription:write", "mission:write", "missions:read"])]
    private $status = "brouillon";

    #[ORM\Column(type: 'json', nullable: true)]
    #[Groups(["prescriptions:read", "prescription:read", "prescription:write", "mission:write", "missions:read"])]
    private $content = [];

    #[ORM\Column(type: 'datetime')]
    #[Groups(["prescriptions:read", "prescription:read", "prescription:write", "mission:write", "missions:read"])]
    private $createdAt;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["prescriptions:read", "prescription:read", "prescription:write", "mission:write", "missions:read"])]
    private $user;

    #[ORM\OneToOne(mappedBy: 'opas', cascade: ['persist', 'remove'])]
    #[Groups(["prescriptions:read", "prescription:read", "prescription:write"])]
    private ?Mission $mission = null;
    
    #[ORM\Column(nullable: true)]
    #[Groups(["prescriptions:read", "prescription:read", "prescription:write"])]
    private ?bool $isSigned = null;
    
    #[ORM\Column(nullable: true)]
    #[Groups(["prescriptions:read", "prescription:read", "prescription:write"])]
    private ?\DateTimeImmutable $signedAt = null;


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
        // unset the owning side of the relation if necessary
        if ($mission === null && $this->mission !== null) {
            $this->mission->setOpas(null);
        }

        // set the owning side of the relation if necessary
        if ($mission !== null && $mission->getOpas() !== $this) {
            $mission->setOpas($this);
        }

        $this->mission = $mission;

        return $this;
    }

    public function isIsSigned(): ?bool
    {
        return $this->isSigned;
    }

    public function setIsSigned(?bool $isSigned): self
    {
        $this->isSigned = $isSigned;

        return $this;
    }

    public function getSignedAt(): ?\DateTimeImmutable
    {
        return $this->signedAt;
    }

    public function setSignedAt(?\DateTimeImmutable $signedAt): self
    {
        $this->signedAt = $signedAt;

        return $this;
    }
}
