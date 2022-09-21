<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\DoctorRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: DoctorRepository::class)]

#[ApiResource(
    attributes: ["pagination_client_enabled" => true],
    normalizationContext: ['groups' => ['doctors:read']],
    denormalizationContext: ['groups' => ['doctor:write']],
)]

class Doctor 
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["doctors:read", "patients:read","missions:read"])]
    private $id;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["doctors:read", "doctor:write", "patient:write", "mission:write"])]
    private $isActive = true;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["doctors:read", "doctor:write", "patient:write", "mission:write", "mission:read", "patients:read", "patient:read","missions:read"])]
    private $category;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["doctors:read", "doctor:write", "patient:write", "mission:write", "mission:read", "missions:read", "patients:read", "patient:read"])]
    private $fullname;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["doctors:read", "doctor:write", "patient:write", "mission:write"])]
    private $organization;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["doctors:read", "doctor:write", "patient:write", "mission:write", "mission:read"])]
    private $phone;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["doctors:read", "doctor:write", "patient:write", "mission:write"])]
    private $fax;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["doctors:read", "doctor:write", "patient:write", "mission:write"])]
    private $mobile;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["doctors:read", "doctor:write", "mission:read"])]
    private $email;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["doctors:read", "doctor:write", "patient:write", "mission:write", "mission:read"])]
    private $npa;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["doctors:read", "doctor:write", "patient:write", "mission:write", "mission:read"])]
    private $city;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["doctors:read", "doctor:write", "patient:write", "mission:write"])]
    private $canton;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["doctors:read", "doctor:write", "patient:write", "mission:write", "mission:read"])]
    private $address1;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["doctors:read", "doctor:write", "patient:write", "mission:write"])]
    private $address2;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["doctors:read", "doctor:write", "patient:write", "mission:write"])]
    private $gln;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["doctors:read", "doctor:write", "patient:write", "mission:write", "mission:read", "missions:read"])]
    private $rcc;

    #[ORM\OneToMany(mappedBy: 'doctor', targetEntity: Patient::class)]
    private $patients;

    #[ORM\Column(type: 'datetime')]
    #[Groups(["doctors:read"])]
    private $createdAt;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private $updatedAt;

    #[ORM\OneToMany(mappedBy: 'doctor', targetEntity: Mission::class)]
    private $missions;

    #[ORM\OneToMany(mappedBy: 'doctor', targetEntity: Comment::class)]
    private $comment;

    public function __construct()
    {
        $this->patients = new ArrayCollection();
        $this->createdAt = new \DateTime();
        $this->missions = new ArrayCollection();
        $this->comment = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getFullname(): ?string
    {
        return $this->fullname;
    }

    public function setFullname(string $fullname): self
    {
        $this->fullname = $fullname;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): self
    {
        $this->category = $category;

        return $this;
    }

    public function getOrganization(): ?string
    {
        return $this->organization;
    }

    public function setOrganization(?string $organization): self
    {
        $this->organization = $organization;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getFax(): ?string
    {
        return $this->fax;
    }

    public function setFax(?string $fax): self
    {
        $this->fax = $fax;

        return $this;
    }

    public function getMobile(): ?string
    {
        return $this->mobile;
    }

    public function setMobile(?string $mobile): self
    {
        $this->mobile = $mobile;

        return $this;
    }

    public function getNpa(): ?string
    {
        return $this->npa;
    }

    public function setNpa(string $npa): self
    {
        $this->npa = $npa;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getCanton(): ?string
    {
        return $this->canton;
    }

    public function setCanton(string $canton): self
    {
        $this->canton = $canton;

        return $this;
    }

    public function getAddress1(): ?string
    {
        return $this->address1;
    }

    public function setAddress1(?string $address1): self
    {
        $this->address1 = $address1;

        return $this;
    }

    public function getAddress2(): ?string
    {
        return $this->address2;
    }

    public function setAddress2(?string $address2): self
    {
        $this->address2 = $address2;

        return $this;
    }

    public function getGln(): ?string
    {
        return $this->gln;
    }

    public function setGln(string $gln): self
    {
        $this->gln = $gln;

        return $this;
    }

    public function getRcc(): ?string
    {
        return $this->rcc;
    }

    public function setRcc(string $rcc): self
    {
        $this->rcc = $rcc;

        return $this;
    }


    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @return Collection<int, Patient>
     */
    public function getPatients(): Collection
    {
        return $this->patients;
    }

    public function addPatient(Patient $patient): self
    {
        if (!$this->patients->contains($patient)) {
            $this->patients[] = $patient;
            $patient->setDoctor($this);
        }

        return $this;
    }

    public function removePatient(Patient $patient): self
    {
        if ($this->patients->removeElement($patient)) {
            // set the owning side to null (unless already changed)
            if ($patient->getDoctor() === $this) {
                $patient->setDoctor(null);
            }
        }

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection<int, Mission>
     */
    public function getMissions(): Collection
    {
        return $this->missions;
    }

    public function addMission(Mission $mission): self
    {
        if (!$this->missions->contains($mission)) {
            $this->missions[] = $mission;
            $mission->setDoctor($this);
        }

        return $this;
    }

    public function removeMission(Mission $mission): self
    {
        if ($this->missions->removeElement($mission)) {
            // set the owning side to null (unless already changed)
            if ($mission->getDoctor() === $this) {
                $mission->setDoctor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComment(): Collection
    {
        return $this->comment;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comment->contains($comment)) {
            $this->comment[] = $comment;
            $comment->setDoctor($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comment->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getDoctor() === $this) {
                $comment->setDoctor(null);
            }
        }

        return $this;
    }
}
