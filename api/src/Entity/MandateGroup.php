<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MandateGroupRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use App\Entity\UserOwnedInterface;

#[ORM\Entity(repositoryClass: MandateGroupRepository::class)]
#[ApiResource(
    paginationClientEnabled: true,
    normalizationContext: ['groups' => ['mandates_group:read']],
    denormalizationContext: ['groups' => ['mandate_group:write']],
    operations: [
        new GetCollection(),
        new Get(normalizationContext: ['groups' => ['mandate_group:read']]),
        new Put(),
        new Post(),
        new Delete(),
    ]
)]

class MandateGroup implements UserOwnedInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["mandates_group:read", "mandate_group:read", "mandates:read"])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'mandateGroups')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["mandates_group:read", "mandate_group:read", "mandate_group:write"])]
    private ?User $user = null;

    #[ORM\Column]
    #[Groups(["mandates_group:read", "mandate_group:read", "mandate_group:write"])]
    private array $patient = [];

    #[ORM\OneToMany(mappedBy: 'mandateGroup', targetEntity: Mandate::class, orphanRemoval: true, cascade: ['persist', 'remove'])]
    #[Groups(["mandates_group:read", "mandate_group:read", "mandate_group:write"])]
    private Collection $mandates;

    #[ORM\OneToMany(mappedBy: 'mandateGroup', targetEntity: MediaObject::class)]
    #[Groups(["mandates_group:read", "mandate_group:read", "mandate_group:write", "mission_group:read", "mandate_group:write"])]
    private $documents;


    public function __construct()
    {
        $this->mandates = new ArrayCollection();
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

    public function getPatient(): array
    {
        return $this->patient;
    }

    public function setPatient(array $patient): self
    {
        $this->patient = $patient;

        return $this;
    }

    /**
     * @return Collection<int, Mandate>
     */
    public function getMandates(): Collection
    {
        return $this->mandates;
    }

    public function addMandate(Mandate $mandate): self
    {
        if (!$this->mandates->contains($mandate)) {
            $this->mandates->add($mandate);
            $mandate->setMandateGroup($this);
        }

        return $this;
    }

    public function removeMandate(Mandate $mandate): self
    {
        if ($this->mandates->removeElement($mandate)) {
            // set the owning side to null (unless already changed)
            if ($mandate->getMandateGroup() === $this) {
                $mandate->setMandateGroup(null);
            }
        }

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
            $document->setMandateGroup($this);
        }

        return $this;
    }

    public function removeDocument(MediaObject $document): self
    {
        if ($this->documents->removeElement($document)) {
            // set the owning side to null (unless already changed)
            if ($document->getMandateGroup() === $this) {
                $document->setMandateGroup(null);
            }
        }

        return $this;
    }
}
