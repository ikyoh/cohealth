<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\UserOwnedInterface;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\MissionRepository;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use App\Filter\MultipleFieldsSearchFilter;
use App\Filter\NotEqualFilter;


#[ORM\Entity(repositoryClass: MissionRepository::class)]
#[ApiResource(
    paginationClientEnabled: true,
    normalizationContext: ['groups' => ['missions:read']],
    denormalizationContext: ['groups' => ['mission:write']],
    operations: [
        new GetCollection(),
        new Get(normalizationContext: ['groups' => ['mission:read']]),
        new Put(),
        new Post()
    ]
)]
#[ApiFilter(OrderFilter::class, properties: ['id', 'status', 'patient.lastname', 'prescriptions.status','user.id', 'beginAt', 'endAt'])]
#[ApiFilter(SearchFilter::class, properties: ['status' => 'exact', 'user.id' => 'exact'])]
#[ApiFilter(MultipleFieldsSearchFilter::class, properties: [
    "id",
    "patient.lastname",
    "patient.firstname",
])]
#[ApiFilter(NotEqualFilter::class, properties: [
    "user.id",
])]

class Mission implements UserOwnedInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["missions:read", "mission:read"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["missions:read", "mission:read", "mission:write"])]
    // en cours, annulé, archivé, facturé
    private $status = 'en cours';

    #[ORM\Column(type: 'string', length: 2047, nullable: true)]
    #[Groups(["missions:read", "mission:read", "mission:write"])]
    private $description;


    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(["missions:read", "mission:read", "mission:write"])]
    private $beginAt;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(["missions:read", "mission:read", "mission:write", "patients:read"])]
    private $endAt;

    #[ORM\ManyToOne(targetEntity: Patient::class, inversedBy: 'missions', cascade: ['persist', 'remove'])]
    #[Groups(["missions:read", "mission:read", "mission:write", "patient:write"])]
    private $patient;

    #[ORM\ManyToOne(targetEntity: Doctor::class, inversedBy: 'missions', cascade: ['persist', 'remove'])]
    #[Groups(["missions:read", "mission:read", "mission:write", "patient:read"])]
    private $doctor;

    #[ORM\ManyToOne(targetEntity: Assurance::class, inversedBy: 'missions', cascade: ['persist', 'remove'])]
    #[Groups(["missions:read", "mission:read", "mission:write", "assurance:write"])]
    private $assurance;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["missions:read", "mission:read"])]
    private $user;

    #[ORM\Column(type: 'json', nullable: true)]
    #[Groups(["missions:read", "mission:read", "mission:write", "patient:read"])]
    private $coworkers = [];

    #[ORM\OneToMany(mappedBy: 'mission', targetEntity: Prescription::class)]
    #[Groups(["missions:read", "mission:read", "mission:write"])]
    private $prescriptions;

    #[ORM\OneToMany(mappedBy: 'mission', targetEntity: MediaObject::class)]
    #[Groups(["missions:read", "mission:read", "mission:write"])]
    private $documents;

    #[ORM\Column(type: 'json', nullable: true)]
    #[Groups(["missions:read", "mission:read", "mission:write", "patient:read"])]
    private $coworkersDetailed = [];

    #[ORM\ManyToOne(inversedBy: 'mission')]
    private ?Mandate $mandate = null;

    public function __construct()
    {
        $this->prescriptions = new ArrayCollection();
        $this->documents = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getBeginAt(): ?string
    {
        if ($this->beginAt) {return $this->beginAt->format('Y-m-d');}
        else {return $this->beginAt;}
    }

    public function setBeginAt(?\DateTimeInterface $beginAt): self
    {
        $this->beginAt = $beginAt;

        return $this;
    }

    public function getEndAt(): ?string
    {
        if ($this->endAt) {return $this->endAt->format('Y-m-d');}
        else {return $this->endAt;}
    }

    public function setEndAt(?\DateTimeInterface $endAt): self
    {
        $this->endAt = $endAt;

        return $this;
    }

    public function getPatient(): ?Patient
    {
        return $this->patient;
    }

    public function setPatient(?Patient $patient): self
    {
        $this->patient = $patient;

        return $this;
    }

    public function getDoctor(): ?Doctor
    {
        return $this->doctor;
    }

    public function setDoctor(?Doctor $doctor): self
    {
        $this->doctor = $doctor;

        return $this;
    }

    public function getAssurance(): ?Assurance
    {
        return $this->assurance;
    }

    public function setAssurance(?Assurance $assurance): self
    {
        $this->assurance = $assurance;

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

    public function getCoworkers(): ?array
    {
        return $this->coworkers;
    }

    public function setCoworkers(?array $coworkers): self
    {
        $this->coworkers = $coworkers;

        return $this;
    }

    /**
     * @return Collection<int, Prescription>
     */
    public function getPrescriptions(): Collection
    {
        return $this->prescriptions;
    }

    public function addPrescription(Prescription $prescription): self
    {
        if (!$this->prescriptions->contains($prescription)) {
            $this->prescriptions[] = $prescription;
            $prescription->setMission($this);
        }

        return $this;
    }

    public function removePrescription(Prescription $prescription): self
    {
        if ($this->prescriptions->removeElement($prescription)) {
            // set the owning side to null (unless already changed)
            if ($prescription->getMission() === $this) {
                $prescription->setMission(null);
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
            $this->documents[] = $document;
            $document->setMission($this);
        }

        return $this;
    }

    public function removeDocument(MediaObject $document): self
    {
        if ($this->documents->removeElement($document)) {
            // set the owning side to null (unless already changed)
            if ($document->getMission() === $this) {
                $document->setMission(null);
            }
        }

        return $this;
    }

    public function getCoworkersDetailed(): ?array
    {
        return $this->coworkersDetailed;
    }

    public function setCoworkersDetailed(?array $coworkersDetailed): self
    {
        $this->coworkersDetailed = $coworkersDetailed;

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
}
