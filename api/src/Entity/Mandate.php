<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MandateRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\UserOwnedInterface;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: MandateRepository::class)]
#[ApiResource(
    paginationClientEnabled: true,
    normalizationContext: ['groups' => ['mandates:read']],
    denormalizationContext: ['groups' => ['mandate:write']],
    operations: [
        new GetCollection(),
        new Get(normalizationContext: ['groups' => ['mandate:read']]),
        new Put(),
        new Post(),
        new Delete(),
    ]
)]
#[ApiFilter(SearchFilter::class, properties: ['status' => 'exact'])]


class Mandate implements UserOwnedInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["mandates:read", "mandate:read", "mission:read"])]
    private ?int $id;

    #[ORM\OneToMany(mappedBy: 'mandate', targetEntity: Mission::class)]
    #[Groups(["mandates:read", "mandate:read", "mandate:write"])]
    private Collection $mission;

    #[ORM\Column(nullable: true)]
    #[Groups(["mandates:read", "mandate:read", "mandate:write"])]
    private array $content = [];

    // Soins infirmiers / Physiothérapie / Aide à la personne / Matériel
    #[ORM\Column(length: 255)]
    #[Groups(["mandates:read", "mandate:read", "mandate:write", "missions:read", "mission:read"])]
    private ?string $category = 'Soins infirmiers';

    //édité / annulé / accepté / refusé / attribué
    #[ORM\Column(length: 255)]
    #[Groups(["mandates:read", "mandate:read", "mandate:write"])]
    private ?string $status = 'édité';

    #[ORM\Column]
    #[Groups(["mandates:read", "mandate:read", "mandate:write"])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(["mandates:read", "mandate:read", "mandate:write"])]
    private ?\DateTimeInterface $acceptedAt = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(["mandates:read", "mandate:read", "mandate:write"])]
    private ?\DateTimeInterface $rejectedAt = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["mandates:read", "mandate:read", "mandate:write"])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'mandates')]
    #[Groups(["mandates:read", "mandate:read", "mandate:write"])]
    private ?User $mandateUser = null;

    #[ORM\Column(length: 255)]
    #[Groups(["mandates:read", "mandate:read", "mandate:write"])]
    private ?string $patientFullname = null;

    #[ORM\Column(length: 255)]
    #[Groups(["mandates:read", "mandate:read", "mandate:write"])]
    private ?string $groupingId = null;

    #[ORM\OneToMany(mappedBy: 'mandate', targetEntity: MediaObject::class)]
    #[Groups(["mandates:read", "mandate:read", "mandate:write", "mission:read"])]
    private $documents;


    public function __construct()
    {
        $this->mission = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
        $this->documents = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * @return Collection<int, Mission>
     */
    public function getMission(): Collection
    {
        return $this->mission;
    }

    public function addMission(Mission $mission): self
    {
        if (!$this->mission->contains($mission)) {
            $this->mission->add($mission);
            $mission->setMandate($this);
        }

        return $this;
    }

    public function removeMission(Mission $mission): self
    {
        if ($this->mission->removeElement($mission)) {
            // set the owning side to null (unless already changed)
            if ($mission->getMandate() === $this) {
                $mission->setMandate(null);
            }
        }

        return $this;
    }

    public function getContent(): array
    {
        return $this->content;
    }

    public function setContent(?array $content): self
    {
        $this->content = $content;

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
    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(?string $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getAcceptedAt(): ?\DateTimeInterface
    {
        return $this->acceptedAt;
    }

    public function setAcceptedAt(?\DateTimeInterface $acceptedAt): self
    {
        $this->acceptedAt = $acceptedAt;

        return $this;
    }

    public function getRejectedAt(): ?\DateTimeInterface
    {
        return $this->rejectedAt;
    }

    public function setRejectedAt(?\DateTimeInterface $rejectedAt): self
    {
        $this->rejectedAt = $rejectedAt;

        return $this;
    }

    public function getMandateUser(): ?User
    {
        return $this->mandateUser;
    }

    public function setMandateUser(?User $mandateUser): self
    {
        $this->mandateUser = $mandateUser;

        return $this;
    }

    public function getPatientFullname(): ?string
    {
        return $this->patientFullname;
    }

    public function setPatientFullname(string $patientFullname): self
    {
        $this->patientFullname = $patientFullname;

        return $this;
    }

    public function getGroupingId(): ?string
    {
        return $this->groupingId;
    }

    public function setGroupingId(string $groupingId): self
    {
        $this->groupingId = $groupingId;

        return $this;
    }

    /**
     * @return Collection<int, MediaObject>
     */
    public function getDocuments(): Collection
    {
        return $this->documents;
    }

    public function addDocument(MediaObject $document): self
    {
        if (!$this->documents->contains($document)) {
            $this->documents->add($document);
            $document->setMandate($this);
        }

        return $this;
    }

    public function removeDocument(MediaObject $document): self
    {
        if ($this->documents->removeElement($document)) {
            // set the owning side to null (unless already changed)
            if ($document->getMandate() === $this) {
                $document->setMandate(null);
            }
        }

        return $this;
    }
}
